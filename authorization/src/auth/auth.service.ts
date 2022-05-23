import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CryptographyService } from '../cryptography/cryptography.service';

const privateFields = {
  passwordHash: 0,
  __v: 0,
  emailConfig: 0,
  _id: 0,
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<UserDocument>,
    private readonly cryptographyService: CryptographyService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async registration(userDto: CreateUserDto) {
    if (await this.userService.getByNickname(userDto.nickname)) {
      throw new BadRequestException(`${userDto.nickname} уже занят`);
    }
    if (await this.userService.getByEmail(userDto.email)) {
      throw new BadRequestException(`Почта ${userDto.email} уже существует`);
    }

    userDto.passwordHash = await this.cryptographyService.generateHash(
      userDto.password,
    );
    userDto.emailConfig.recoveryCode =
      await this.cryptographyService.generateRecoveryCode(userDto.password);
    userDto.password = undefined;

    const user = new this.userRepository(userDto);
    return user.save();
  }

  async login(userDto: CreateUserDto) {
    console.log(userDto);
  }
}
