import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

export enum UserRoleType {
  admin = 'ADMIN',
  user = 'USER',
  moderator = 'MODERATOR',
}

export enum SexType {
  woman = 'woman',
  male = 'male',
}

@Schema({ _id: false })
class EmailConfig {
  @Prop()
  recoveryCode: string;
}

@Schema()
export class User {
  @ApiProperty({
    default: +new Date(),
    description: 'ID пользователя new Date()',
    type: Number,
  })
  @Prop()
  id: number;

  @ApiProperty({
    example: 'test@test.com',
    description: 'Почта пользователя',
    type: String,
  })
  @Prop()
  email: string;

  @Prop()
  emailConfig: EmailConfig;

  @ApiProperty({
    example: `Игрок ${+new Date()}`,
    description: 'Имя пользователя в игре',
    type: String,
  })
  @Prop()
  nickname: string;

  @Prop()
  passwordHash: string;

  @ApiProperty({
    description: 'Роль в игре',
    type: String,
    default: UserRoleType.user,
  })
  @Prop({ default: UserRoleType.user })
  role: UserRoleType;

  @ApiProperty({
    description: 'Уровень в игре',
    type: Number,
    default: 0,
  })
  @Prop({ default: 0 })
  lvlPoint: number;

  @ApiProperty({
    description: 'Основная валюта в игре',
    type: Number,
    default: 0,
  })
  @Prop({ default: 0 })
  money: number;

  @ApiProperty({
    description: 'Популярность в игре',
    type: Number,
    default: 0,
  })
  @Prop({ default: 0 })
  popularPoint: number;

  @ApiProperty({
    description: 'Когда создан пользователь',
    type: Date,
    default: new Date(),
  })
  @Prop({ default: new Date() })
  updated: Date;

  @ApiProperty({
    description: 'Когда обновлён пользователь',
    type: Date,
    default: new Date(),
  })
  @Prop({ default: new Date() })
  created: Date;

  @ApiProperty({
    description: 'Пол пользователя',
    type: String,
    default: SexType.male,
  })
  @Prop({ default: SexType.male })
  sex: SexType;
}

export const UserSchema = SchemaFactory.createForClass(User);
