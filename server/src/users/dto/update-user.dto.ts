import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserRoleType } from '../../schemas/users.schema';

class UpdateUser {
  @IsString()
  readonly nickname: string;

  @IsEnum(UserRoleType)
  readonly role: UserRoleType;

  @IsNumber()
  readonly lvlPoint: number;

  @IsNumber()
  readonly money: number;

  @IsNumber()
  readonly popularPoint: number;

  @IsDate()
  readonly updated: Date;

  @IsDate()
  readonly created: Date;
}

export class UpdateUserDto extends PartialType(UpdateUser) {}
