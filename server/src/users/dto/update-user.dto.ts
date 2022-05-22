import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { SexType, UserRoleType } from '../../schemas/users.schema';
import { ApiProperty, PartialType } from '@nestjs/swagger';

class UpdateUser {
  @ApiProperty({ example: `Новый никнейм`, type: String })
  @IsString()
  readonly nickname: string;

  @ApiProperty({ example: UserRoleType.moderator, type: String })
  @IsEnum(UserRoleType)
  readonly role: UserRoleType;

  @ApiProperty({ example: 100, type: Number })
  @IsNumber()
  readonly lvlPoint: number;

  @ApiProperty({ example: 10000, type: Number })
  @IsNumber()
  readonly money: number;

  @ApiProperty({ example: 10, type: Number })
  @IsNumber()
  readonly popularPoint: number;

  @ApiProperty({ example: new Date(), type: Date })
  @IsDate()
  readonly updated: Date;

  @ApiProperty({ example: SexType.woman, type: String })
  @IsEnum(SexType)
  readonly sex: SexType;
}

export class UpdateUserDto extends PartialType(UpdateUser) {}
