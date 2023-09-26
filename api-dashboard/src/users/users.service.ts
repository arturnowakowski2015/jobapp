import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './model/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(findBy: Pick<FindOptionsWhere<User>, 'email' | 'id'>) {
    const dbUser = await this.userRepository.findOneBy(findBy);

    if (!dbUser) {
      throw new NotFoundException();
    }

    const { password, refreshToken, ...user } = dbUser;

    return user;
  }

  findOneWithPassword(findBy: Pick<FindOptionsWhere<User>, 'email' | 'id'>) {
    return this.userRepository.findOneBy(findBy);
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await argon2.hash(createUserDto.password);

    const foundUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (foundUser) {
      throw new ConflictException('User with given email already exists');
    }

    const createdUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const user = await this.userRepository.save(createdUser);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const hashedPassword = await argon2.hash(updatePasswordDto.password);

    await this.userRepository.update(
      { id: userId },
      { password: hashedPassword, refreshToken: null },
    );
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.userRepository.update(
      { id: userId },
      { refreshToken: hashedRefreshToken },
    );
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    await this.userRepository.update({ id: userId }, updateProfileDto);
  }
}
