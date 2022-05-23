import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { SexType, UserRoleType } from '../../schemas/users.schema';
import { ApiProperty } from '@nestjs/swagger';

class EmailConfig {
  @ApiProperty()
  @IsString()
  public recoveryCode = '';
}

export class CreateUserDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number = +new Date();

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsObject()
  public emailConfig: EmailConfig = {
    recoveryCode: '',
  };

  @ApiProperty()
  @IsString()
  readonly nickname: string;

  @ApiProperty()
  @IsString()
  public password: string;

  @IsString()
  public passwordHash = '';

  @ApiProperty()
  @IsEnum(UserRoleType)
  readonly role: UserRoleType = UserRoleType.user;

  @ApiProperty()
  @IsNumber()
  readonly lvlPoint: number = 0;

  @ApiProperty()
  @IsNumber()
  readonly money: number = 0;

  @ApiProperty()
  @IsNumber()
  readonly popularPoint: number = 0;

  @ApiProperty()
  @IsDate()
  readonly updated: Date = new Date();

  @ApiProperty()
  @IsDate()
  readonly created: Date = new Date();

  @ApiProperty({ example: SexType.male })
  @IsEnum(SexType)
  @IsOptional()
  readonly sex?: SexType;
}
