import { client } from './db';
import { UserType } from '../application/userService';

export let users = client.db('test').collection<UserType>('users');

export const authRepository = {
  async getById(id: number): Promise<UserType | null> {
    return await users.findOne({ id }, { projection: { _id: 0, passwordHash: 0, 'emailConfig.recoveryCode': 0 } });
  },
  async getByEmail(email: string): Promise<UserType | null> {
    return await users.findOne({ email }, { projection: { _id: 0 } });
  },
  async getByRecoveryCode(recoveryCode: string): Promise<UserType | null> {
    return await users.findOne({ 'emailConfig.recoveryCode': recoveryCode }, { projection: { _id: 0 } });
  },
  async getByNickname(nickname: string): Promise<UserType | null> {
    return await users.findOne({ nickname }, { projection: { _id: 0 } });
  },
  async create(newUser: UserType): Promise<void> {
    await users.insertOne(newUser);
  },
  async setNewPassword(newPasswordHash: string, newRecoveryCode: string, recoveryCode: string): Promise<void> {
    await users.updateOne(
      { 'emailConfig.recoveryCode': recoveryCode },
      {
        $set: { 'emailConfig.recoveryCode': newRecoveryCode, passwordHash: newPasswordHash },
        $currentDate: { lastModified: true },
      }
    );
  },
};
