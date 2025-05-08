import { comparePassword, hashPassword } from '@/common/utils/password.util';
import { IUser } from '@/models/user.model';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';
import { UserSessionService } from '../user-session/user-session.service';
import { UserService } from '../user/user.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { EDeviceType, LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse, SignUpDto } from './types/auth.types';

interface JwtPayload {
  sub: string;
  email: string;
}

interface TokenResponse {
  token: string;
  refreshToken: string;
}

interface JwtVerifyResponse {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

interface DeviceInfo {
  userAgent?: string;
  ipAddress?: string;
  platform?: string;
  browser?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly userSessionService: UserSessionService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<IUser, 'password'> | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user.toObject() as IUser;
    return result as Omit<IUser, 'password'>;
  }

  async login(loginDto: LoginDto, deviceInfo: DeviceInfo): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(loginDto.password, user.password);
    console.log('isPasswordValid: ', isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { token, refreshToken } = await this.generateTokens(user, loginDto.deviceType);

    // Deactivate any existing sessions with the same device type
    await this.userSessionService.deactivateAllSessions(user._id.toString());

    // Create new session
    const decodedToken = this.jwtService.decode(token) as { exp: number };
    await this.userSessionService.createSession({
      userId: user._id,
      deviceType: loginDto.deviceType,
      deviceInfo: {
        userAgent: deviceInfo.userAgent || '',
        ipAddress: deviceInfo.ipAddress || '',
        platform: deviceInfo.platform || '',
        browser: deviceInfo.browser || '',
      },
      accessToken: token,
      refreshToken,
      expiresAt: new Date(decodedToken.exp * 1000),
    });

    return {
      token,
      refreshToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: {
          plan: user.subscription?.tier || 'free',
          expiresAt: user.subscription?.endDate?.toISOString() || null,
        },
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async signUp(registerDto: RegisterDto): Promise<SignUpDto> {
    const existingUser = await this.userService.findByEmail(registerDto.email);
    console.log('existingUser: ', existingUser);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.userService.create({
      email: registerDto.email,
      password: registerDto.password,
      firstName: registerDto.name.split(' ')[0],
      lastName: registerDto.name.split(' ').slice(1).join(' '),
    });

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: {
          plan: user.subscription.tier,
          expiresAt: user.subscription.endDate?.toISOString() || null,
        },
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async signOut(userId: string, accessToken: string, deviceType: EDeviceType): Promise<boolean> {
    // Deactivate session
    await this.userSessionService.deactivateSession(accessToken);

    // Add access token to blacklist
    const decodedAccessToken = this.jwtService.decode(accessToken) as { exp: number };
    if (decodedAccessToken?.exp) {
      const expiresAt = new Date(decodedAccessToken.exp * 1000);
      await this.tokenBlacklistService.addToBlacklist(accessToken, userId, deviceType, expiresAt);
    }

    return true;
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    try {
      const payload = (await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
      )) as JwtVerifyResponse;
      const user = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(user, EDeviceType.WEB);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userService.findOne(changePasswordDto.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await comparePassword(changePasswordDto.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
      throw new BadRequestException('New passwords do not match');
    }

    const hashedPassword = await hashPassword(changePasswordDto.newPassword);
    await this.userService.updatePassword(user._id.toString(), hashedPassword);

    return {
      success: true,
      message: 'Password updated successfully',
    };
  }

  private async generateTokens(user: IUser, deviceType: EDeviceType): Promise<TokenResponse> {
    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
    };
    console.log('payload: ', payload);

    // Set different expiration times based on device type
    const tokenExpiresIn = deviceType === EDeviceType.WEB ? '7d' : '30d';
    const refreshTokenExpiresIn = deviceType === EDeviceType.WEB ? '30d' : '90d';

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: tokenExpiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: refreshTokenExpiresIn,
    });

    return { token, refreshToken };
  }
}
