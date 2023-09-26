import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { RefreshTokenGuard } from 'src/jwt/guards/refresh-token.guard';
import { AuthorisedRequest } from 'src/types/request';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import { BasicTokensDto, TokensDto } from './dto/refresh-token-response.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 409,
    description: 'User with given email already exists',
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: TokensDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('basic-login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: BasicTokensDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async basicLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, false);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @ApiBearerAuth()
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async changePassword(
    @Request() request: AuthorisedRequest,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(request.user.id, changePasswordDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  @ApiBody({ type: RefreshTokenRequestDto })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: TokensDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  refreshToken(@Request() request: AuthorisedRequest) {
    return this.authService.refreshToken(request.user.id);
  }
}
