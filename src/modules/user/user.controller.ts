import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
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
import { RolesGuard } from '../../common/guards/roles.guard';
import { TokenBlacklistGuard } from '../../common/guards/token-blacklist.guard';
import { CreatedResponse, SuccessResponse } from '../../common/responses';
import { EUserRole } from '../../common/types/user.type';
import { IUser } from '../../models/user.model';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  CreateUserDto,
  LinkSocialProfileDto,
  ResetPasswordDto,
  UpdatePreferencesDto,
  UpdateStatsDto,
  UpdateSubscriptionDto,
  UpdateUserDto,
} from './dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TokenBlacklistGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  @ApiBearerAuth()
  @ApiSecurity('admin')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      default: {
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'Password123!',
          role: EUserRole.USER,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CreatedResponse',
        },
        example: {
          status: 'Created',
          statusCode: 201,
          message: 'User created successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: EUserRole.USER,
            createdAt: '2024-04-15T10:00:00.000Z',
            updatedAt: '2024-04-15T10:00:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return new CreatedResponse({ data: user });
  }

  @Get()
  @UseGuards(JwtAuthGuard, TokenBlacklistGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  @ApiBearerAuth()
  @ApiSecurity('admin')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'Users retrieved successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: [
            {
              id: '123e4567-e89b-12d3-a456-426614174000',
              name: 'John Doe',
              email: 'john.doe@example.com',
              role: EUserRole.USER,
              createdAt: '2024-04-15T10:00:00.000Z',
              updatedAt: '2024-04-15T10:00:00.000Z',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findAll() {
    const users = await this.userService.findAll();
    return new SuccessResponse({ data: users });
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, TokenBlacklistGuard)
  @ApiBearerAuth()
  @ApiSecurity('user')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'Profile retrieved successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: EUserRole.USER,
            preferences: {
              language: 'en',
              theme: 'light',
              notifications: {
                email: true,
                push: true,
              },
            },
            subscription: {
              plan: 'free',
              status: 'active',
              expiresAt: null,
            },
            createdAt: '2024-04-15T10:00:00.000Z',
            updatedAt: '2024-04-15T10:00:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req: { user: { id: string } }) {
    const user = await this.userService.findOne(req.user.id);
    return new SuccessResponse({ data: user });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TokenBlacklistGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  @ApiBearerAuth()
  @ApiSecurity('admin')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User details',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'User retrieved successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: EUserRole.USER,
            preferences: {
              language: 'en',
              theme: 'light',
              notifications: {
                email: true,
                push: true,
              },
            },
            subscription: {
              plan: 'free',
              status: 'active',
              expiresAt: null,
            },
            createdAt: '2024-04-15T10:00:00.000Z',
            updatedAt: '2024-04-15T10:00:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return new SuccessResponse({ data: user });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TokenBlacklistGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  @ApiBearerAuth()
  @ApiSecurity('admin')
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      default: {
        value: {
          name: 'John Doe Updated',
          email: 'john.doe.updated@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'User updated successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'John Doe Updated',
            email: 'john.doe.updated@example.com',
            role: EUserRole.USER,
            preferences: {
              language: 'en',
              theme: 'light',
              notifications: {
                email: true,
                push: true,
              },
            },
            subscription: {
              plan: 'free',
              status: 'active',
              expiresAt: null,
            },
            createdAt: '2024-04-15T10:00:00.000Z',
            updatedAt: '2024-04-15T10:00:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return new SuccessResponse({ data: user });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TokenBlacklistGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  @ApiBearerAuth()
  @ApiSecurity('admin')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'User deleted successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: null,
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string) {
    await this.userService.delete(id);
    return new SuccessResponse({ message: 'User deleted successfully' });
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiBody({
    type: ResetPasswordDto,
    examples: {
      default: {
        value: {
          email: 'john.doe@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'Password reset email sent',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: null,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.userService.resetPassword(resetPasswordDto);
    return new SuccessResponse({ message: 'Password reset email sent' });
  }

  @Post('verify-email/:token')
  @ApiOperation({ summary: 'Verify email' })
  @ApiResponse({
    status: 200,
    description: 'Email verified successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'Email verified successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: null,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid token' })
  async verifyEmail(@Param('token') token: string) {
    await this.userService.verifyEmail(token);
    return new SuccessResponse({ message: 'Email verified successfully' });
  }

  @Patch('preferences')
  @UseGuards(JwtAuthGuard, TokenBlacklistGuard)
  @ApiBearerAuth()
  @ApiSecurity('user')
  @ApiOperation({ summary: 'Update user preferences' })
  @ApiBody({
    type: UpdatePreferencesDto,
    examples: {
      default: {
        value: {
          language: 'en',
          theme: 'light',
          notifications: {
            email: true,
            push: true,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Preferences updated successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'Preferences updated successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            preferences: {
              language: 'en',
              theme: 'light',
              notifications: {
                email: true,
                push: true,
              },
            },
            updatedAt: '2024-04-15T10:00:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updatePreferences(
    @Request() req: { user: { id: string } },
    @Body() preferences: UpdatePreferencesDto,
  ) {
    const user = await this.userService.updatePreferences(req.user.id, preferences);
    return new SuccessResponse({ data: user });
  }

  @Patch('subscription')
  @UseGuards(JwtAuthGuard, TokenBlacklistGuard)
  @ApiBearerAuth()
  @ApiSecurity('user')
  @ApiOperation({ summary: 'Update user subscription' })
  @ApiBody({
    type: UpdateSubscriptionDto,
    examples: {
      default: {
        value: {
          plan: 'premium',
          status: 'active',
          expiresAt: '2024-12-31T23:59:59Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Subscription updated successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'Subscription updated successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            subscription: {
              plan: 'premium',
              status: 'active',
              expiresAt: '2024-12-31T23:59:59Z',
            },
            updatedAt: '2024-04-15T10:00:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateSubscription(
    @Request() req: { user: { id: string } },
    @Body() subscription: UpdateSubscriptionDto,
  ) {
    const user = await this.userService.updateSubscription(req.user.id, subscription);
    return new SuccessResponse({ data: user });
  }

  @Post('social/link')
  @UseGuards(JwtAuthGuard, TokenBlacklistGuard)
  @ApiBearerAuth()
  @ApiSecurity('user')
  @ApiOperation({ summary: 'Link social profile' })
  @ApiBody({
    type: LinkSocialProfileDto,
    examples: {
      default: {
        value: {
          provider: 'google',
          profileId: '123456789',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Social profile linked successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'Social profile linked successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            socialProfiles: {
              google: '123456789',
            },
            updatedAt: '2024-04-15T10:00:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async linkSocialProfile(
    @Request() req: { user: { id: string } },
    @Body() data: LinkSocialProfileDto,
  ) {
    const user = await this.userService.linkSocialProfile(
      req.user.id,
      data.provider,
      data.profileId,
    );
    return new SuccessResponse({ data: user });
  }

  @Post('social/unlink/:provider')
  @UseGuards(JwtAuthGuard, TokenBlacklistGuard)
  @ApiBearerAuth()
  @ApiSecurity('user')
  @ApiOperation({ summary: 'Unlink social profile' })
  @ApiResponse({
    status: 200,
    description: 'Social profile unlinked successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'Social profile unlinked successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            socialProfiles: {},
            updatedAt: '2024-04-15T10:00:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async unlinkSocialProfile(
    @Request() req: { user: { id: string } },
    @Param('provider') provider: keyof IUser['socialProfiles'],
  ) {
    const user = await this.userService.unlinkSocialProfile(req.user.id, provider);
    return new SuccessResponse({ data: user });
  }

  @Patch('stats/:field')
  @UseGuards(JwtAuthGuard, TokenBlacklistGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  @ApiBearerAuth()
  @ApiSecurity('admin')
  @ApiOperation({ summary: 'Update user stats' })
  @ApiBody({
    type: UpdateStatsDto,
    examples: {
      default: {
        value: {
          userId: '507f1f77bcf86cd799439011',
          increment: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Stats updated successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'Stats updated successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            id: '507f1f77bcf86cd799439011',
            stats: {
              tripsCreated: 1,
              activitiesCreated: 0,
              lastActive: '2024-04-15T10:00:00.000Z',
            },
            updatedAt: '2024-04-15T10:00:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async updateStats(@Param('field') field: keyof IUser['stats'], @Body() data: UpdateStatsDto) {
    const user = await this.userService.updateStats(data.userId, field, data.increment);
    return new SuccessResponse({ data: user });
  }
}
