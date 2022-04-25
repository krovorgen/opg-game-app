import bcrypt from 'bcrypt';

export type UserRoleType = 'ADMIN' | 'USER' | 'MODERATOR';

export type UserType = {
  id: number;
  name: string;
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
  name: string;
  private readonly password: string;
  passwordSalt: string = '';
  passwordHash: string = '';
  role: UserRoleType = 'USER';
  lvlPoint: number = 0;
  money: number = 0;
  popularPoint: number = 0;
  updated: Date = new Date();
  created: Date = new Date();

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }

  static build() {}

  private generateSalt = async () => {
    this.passwordSalt = await bcrypt.genSalt(2);
  };

  private generateHash = async () => {
    this.passwordHash = await bcrypt.hash(this.password, this.passwordSalt);
  };

  async init() {
    await this.generateSalt();
    await this.generateHash();
  }
}
