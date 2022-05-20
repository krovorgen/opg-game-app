import { settings } from '../helpers/settings';
import mongoose from 'mongoose';
import { UserType } from '../application/userService';

const host = settings.MONGO_URL;
const mongoUri = `mongodb://${host}/test`;

export async function runDb() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected successfully to mongo server');
  } catch {
    await mongoose.disconnect();
    console.log("Can't connect to db");
  }
}

const userSchema = new mongoose.Schema<UserType>({
  id: Number,
  email: String,
  emailConfig: {
    recoveryCode: String,
  },
  nickname: String,
  passwordHash: String,
  role: {
    type: String,
    default: 'USER',
  },
  lvlPoint: Number,
  money: Number,
  popularPoint: Number,
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
});

export const UsersModel = mongoose.model('Users', userSchema);
