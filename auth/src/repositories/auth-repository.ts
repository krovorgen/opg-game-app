import { UsersModel } from './db';
import { UserType } from '../application/userService';

class AuthRepository {
  async getById(id: number): Promise<UserType | null> {
    return UsersModel.findOne({ id }, { projection: { _id: 0, passwordHash: 0, 'emailConfig.recoveryCode': 0 } });
  }

  async getByEmail(email: string): Promise<UserType | null> {
    return UsersModel.findOne({ email }, { projection: { _id: 0 } });
  }

  async getByRecoveryCode(recoveryCode: string): Promise<UserType | null> {
    return UsersModel.findOne({ 'emailConfig.recoveryCode': recoveryCode }, { projection: { _id: 0 } });
  }

  async getByNickname(nickname: string): Promise<UserType | null> {
    return UsersModel.findOne({ nickname }, { projection: { _id: 0 } });
  }

  async create(newUser: UserType): Promise<void> {
    await UsersModel.create(newUser);
  }

  async setNewPassword(newPasswordHash: string, newRecoveryCode: string, recoveryCode: string): Promise<void> {
    await UsersModel.updateOne(
      { 'emailConfig.recoveryCode': recoveryCode },
      {
        $set: { 'emailConfig.recoveryCode': newRecoveryCode, passwordHash: newPasswordHash },
        $currentDate: { updated: true },
      }
    );
  }
}

export const authRepository = new AuthRepository();
