import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  @Prop()
  id: number;

  @Prop()
  email: string;

  @Prop()
  emailConfig: EmailConfig;

  @Prop()
  nickname: string;

  @Prop()
  passwordHash: string;

  @Prop({ default: UserRoleType.user })
  role: UserRoleType;

  @Prop({ default: 0 })
  lvlPoint: number;

  @Prop({ default: 0 })
  money: number;

  @Prop({ default: 0 })
  popularPoint: number;

  @Prop({ default: new Date() })
  updated: Date;

  @Prop({ default: new Date() })
  created: Date;

  @Prop()
  sex: SexType;
}

export const UserSchema = SchemaFactory.createForClass(User);
