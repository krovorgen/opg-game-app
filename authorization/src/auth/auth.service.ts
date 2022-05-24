import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CryptographyService } from '../cryptography/cryptography.service';
import { LoginUserDto } from './dto/login-user.dto';
import { request } from 'undici';
import configuration from '../config/configuration';

export type PayloadToken = {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
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
      throw new BadRequestException([`${userDto.nickname} уже занят`]);
    }
    if (await this.userService.getByEmail(userDto.email)) {
      throw new BadRequestException([`Почта ${userDto.email} уже существует`]);
    }

    const user = await this.userService.createUser(userDto);

    return this.generateToken(user);
  }

  async login(userDto: LoginUserDto) {
    const user = await this.userService.getByEmail(userDto.email);
    if (!user) {
      throw new BadRequestException([`Почта ${userDto.email} не существует`]);
    }
    const correctDto = await this.validateUser(userDto, user);

    if (!correctDto) {
      throw new UnauthorizedException(['Неверный логин или пароль']);
    }

    return this.generateToken(user);
  }

  async me(userToken: PayloadToken) {
    const user = await this.userService.getById(userToken.id);
    if (!user) {
      throw new BadRequestException([
        `Данного пользователя больше не существует`,
      ]);
    }
    return user;
  }

  async setNewPassword(newPassword: string, recoveryCode: string) {
    const user = this.userRepository.findOne({
      'emailConfig.recoveryCode': recoveryCode,
    });
    if (!user) {
      throw new BadRequestException([
        `Ссылка на восстановление пароля устарела!`,
      ]);
    }

    return user.update({
      passwordHash: await this.cryptographyService.generateHash(newPassword),
      'emailConfig.recoveryCode':
        await this.cryptographyService.generateRecoveryCode(newPassword),
    });
  }

  async passwordRecovery(email) {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new BadRequestException([`Почта ${email} не существует`]);
    }

    try {
      const { statusCode } = await request(
        `${configuration().EMAIL_URL}email/password-recovery`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email,
            recoveryCode: user.emailConfig.recoveryCode,
          }),
        },
      );
      return statusCode;
    } catch (e) {
      throw new InternalServerErrorException('Что-то пошло не так!');
    }
  }

  private generateToken(user: User): { token: string } {
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }

  private async validateUser(
    userDto: LoginUserDto,
    user: User,
  ): Promise<boolean> {
    return await this.cryptographyService.correctPassword(
      userDto.password,
      user.passwordHash,
    );
  }
}
