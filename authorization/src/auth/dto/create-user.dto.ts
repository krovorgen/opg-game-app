import { IsEnum, IsString } from 'class-validator';
import { SexType } from '../../schemas/users.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: `user@mail.ru`, type: String })
  @IsString()
  readonly email: string;

  @ApiProperty({ example: `Никнейм`, type: String })
  @IsString()
  readonly nickname: string;

  @ApiProperty({ example: `Пароль`, type: String })
  @IsString()
  readonly password: string;

  @ApiProperty({ example: SexType.male, type: String })
  @IsEnum(SexType)
  readonly sex: SexType;
}
