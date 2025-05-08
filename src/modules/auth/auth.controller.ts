import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CreatedResponse, SuccessResponse } from '@/common/responses';
import { RequestWithUser } from '@/common/types/request-with-user.type';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ChangePasswordDto, EDeviceType, LoginDto, RefreshTokenDto, RegisterDto } from './dto';
import { TokenResponse } from './types/auth.types';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CreatedResponse',
        },
        example: {
          status: 'Created',
          statusCode: 201,
          message: 'User registered successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            email: 'user@example.com',
            name: 'John Doe',
            createdAt: '2024-04-15T10:00:00.000Z',
            updatedAt: '2024-04-15T10:00:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.signUp(registerDto);
    return new CreatedResponse({
      data: result.user,
      message: 'User registered successfully',
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'User logged in successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            user: {
              id: '123e4567-e89b-12d3-a456-426614174000',
              email: 'user@example.com',
              name: 'John Doe',
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    const userAgent = req.headers['user-agent']?.toString() || '';
    const ipAddress = req.ip || req.socket.remoteAddress || '';
    const platform = req.headers['sec-ch-ua-platform']?.toString() || '';
    const browser = req.headers['sec-ch-ua']?.toString() || '';

    const result = await this.authService.login(loginDto, {
      userAgent,
      ipAddress,
      platform,
      browser,
    });
    return new SuccessResponse({
      data: result,
      message: 'User logged in successfully',
    });
  }

  @Post('sign-out')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'User logout' })
  @ApiSecurity('bearer')
  @ApiResponse({
    status: 200,
    description: 'Successfully signed out',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'Successfully signed out',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: null,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ErrorResponse',
        },
        example: {
          status: 'error',
          statusCode: 401,
          message: 'Unauthorized',
          timestamp: '2024-04-15T10:00:00.000Z',
          error: 'No token provided',
        },
      },
    },
  })
  async logout(@Req() req: RequestWithUser): Promise<SuccessResponse<undefined>> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    await this.authService.signOut(req.user._id.toString(), token, EDeviceType.WEB);

    return new SuccessResponse({
      message: 'Successfully signed out',
    });
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({
    type: RefreshTokenDto,
    examples: {
      default: {
        value: {
          refreshToken: 'rt_1a2b3c4d5e6f7g8h9i0j',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Returns new access token and refresh token',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid refresh token',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: SuccessResponse,
  })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Change password' })
  @ApiSecurity('bearer')
  @ApiBody({
    type: ChangePasswordDto,
    examples: {
      default: {
        value: {
          userId: '507f1f77bcf86cd799439011',
          currentPassword: 'CurrentPassword123!',
          newPassword: 'NewPassword123!',
          confirmPassword: 'NewPassword123!',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Current password is incorrect',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: SuccessResponse,
  })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.authService.changePassword(changePasswordDto);
  }
}
