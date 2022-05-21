import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private catModel: Model<UserDocument>) {}

  getUsers() {
    return this.catModel.find().exec();
  }
}
