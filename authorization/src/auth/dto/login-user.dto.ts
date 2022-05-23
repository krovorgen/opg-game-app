import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: `user@mail.ru`, type: String })
  @IsString()
  readonly email: string;

  @ApiProperty({ example: `Пароль`, type: String })
  @IsString()
  readonly password: string;
}
