import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRoleType } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { CryptographyService } from '../cryptography/cryptography.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<UserDocument>,
    private readonly cryptographyService: CryptographyService,
  ) {}

  async getByEmail(email: string) {
    return this.userRepository.findOne({ email }, { projection: { _id: 0 } });
  }

  async getByNickname(nickname: string) {
    return this.userRepository.findOne(
      { nickname },
      { projection: { _id: 0 } },
    );
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser: User = {
      ...createUserDto,
      id: +new Date(),
      emailConfig: {
        recoveryCode: await this.cryptographyService.generateRecoveryCode(
          createUserDto.password,
        ),
      },
      passwordHash: await this.cryptographyService.generateHash(
        createUserDto.password,
      ),
      role: UserRoleType.user,
      lvlPoint: 0,
      money: 0,
      popularPoint: 0,
      updated: new Date(),
      created: new Date(),
    };
    console.log(newUser);
  }
}
