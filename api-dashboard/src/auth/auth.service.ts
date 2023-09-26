import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto, withRefreshToken = true) {
    const user = await this.usersService.findOneWithPassword({
      email: loginDto.email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await argon2.verify(
      user.password,
      loginDto.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    if (!withRefreshToken) {
      return this.jwtService.sign(user.id, true);
    } else {
      return this.refreshToken(user.id);
    }
  }

  async refreshToken(userId: string) {
    const refreshToken = this.jwtService.signRefreshToken(userId);
    const accessToken = this.jwtService.sign(userId);

    await this.usersService.updateRefreshToken(userId, refreshToken);

    return { refreshToken, accessToken };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findOneWithPassword({
      id: userId,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await argon2.verify(
      user.password,
      changePasswordDto.oldPassword,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    return this.usersService.updatePassword(userId, {
      password: changePasswordDto.newPassword,
    });
  }

  async register(userData: RegisterDto) {
    await this.usersService.create(userData);
  }
}
