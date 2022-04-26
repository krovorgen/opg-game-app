import bcrypt from 'bcrypt';

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
  id: number = +new Date();
  email: string;
  nickname: string;
  private readonly password: string;
  passwordSalt: string = '';
  passwordHash: string = '';
  role: UserRoleType = 'USER';
  lvlPoint: number = 0;
  money: number = 0;
  popularPoint: number = 0;
  updated: Date = new Date();
  created: Date = new Date();

  constructor(email: string, password: string, nickname: string) {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
  }

  private generateSalt = async () => {
    this.passwordSalt = await bcrypt.genSalt(2);
  };

  private generateHash = async () => {
    this.passwordHash = await bcrypt.hash(this.password, this.passwordSalt);
  };

  async getUser(): Promise<UserType> {
    await this.generateSalt();
    await this.generateHash();

    return {
      id: this.id,
      email: this.email,
      nickname: this.nickname,
      passwordSalt: this.passwordSalt,
      passwordHash: this.passwordHash,
      role: this.role,
      lvlPoint: this.lvlPoint,
      money: this.money,
      popularPoint: this.popularPoint,
      updated: this.updated,
      created: this.created,
    };
  }
}
