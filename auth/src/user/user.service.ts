import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRoleType } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { CryptographyService } from '../cryptography/cryptography.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';

const privateFields = {
  passwordHash: 0,
  __v: 0,
  emailConfig: 0,
  _id: 0,
};

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<UserDocument>,
    private readonly cryptographyService: CryptographyService,
  ) {}

  async getById(id: number) {
    return this.userRepository.findOne({ id: id }, privateFields);
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({ email }, { _id: 0 });
  }

  async getByNickname(nickname: string) {
    return this.userRepository.findOne({ nickname }, { _id: 0 });
  }

  async getByRecoveryCode(recoveryCode: string) {
    return this.userRepository.findOne(
      {
        'emailConfig.recoveryCode': recoveryCode,
      },
      privateFields,
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

    return await new this.userRepository(newUser).save();
  }
}
