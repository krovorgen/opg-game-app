import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

const privateFields = {
  passwordHash: 0,
  __v: 0,
  emailConfig: 0,
  _id: 0,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<UserDocument>,
  ) {}

  async getUsers() {
    return await this.userRepository.find({}, privateFields).exec();
  }

  async getById(id: number) {
    const user = await this.userRepository
      .findOne({ id }, privateFields)
      .exec();
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOneAndUpdate(
      { id },
      { $set: updateUserDto, $currentDate: { updated: true } },
      { new: true, projection: privateFields },
    );
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return existingUser;
  }
}
