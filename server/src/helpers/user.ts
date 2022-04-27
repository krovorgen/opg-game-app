import bcrypt from 'bcryptjs';

export type UserRoleType = 'ADMIN' | 'USER' | 'MODERATOR';

export type UserType = {
  id: number;
  email: string;
  nickname: string;
  passwordSalt: string;
  passwordHash: string;
  role: UserRoleType;
  lvlPoint: number;
  money: number;
  popularPoint: number;
  updated: Date;
  created: Date;
};

export class User {
  private generateSalt = async () => {
    return await bcrypt.genSalt(2);
  };

  generateHash = async (password: string, passwordSalt: string) => {
    return await bcrypt.hash(password, passwordSalt);
  };

  async createUser(email: string, password: string, nickname: string): Promise<UserType> {
    const passwordSalt = await this.generateSalt();
    const passwordHash = await this.generateHash(password, passwordSalt);

    return {
      id: +new Date(),
      email,
      nickname,
      passwordSalt,
      passwordHash,
      role: 'USER',
      lvlPoint: 0,
      money: 0,
      popularPoint: 0,
      updated: new Date(),
      created: new Date(),
    };
  }
}
