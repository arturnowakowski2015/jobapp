import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { AuthorisedRequest } from 'src/types/request';
import { User } from 'src/users/model/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  me(@Request() request: AuthorisedRequest) {
    return this.userService.findOne({ id: request.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  updateProfile(
    @Request() request: AuthorisedRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(request.user.id, updateProfileDto);
  }
}
