import 'dotenv/config';
import { deepStrictEqual, notDeepStrictEqual } from 'assert';
import { User, UserType } from '../application/userService';
import { cryptography } from '../application/cryptographyService';
import { authService } from '../services/auth-service';
import { runDb } from '../repositories/db';

before(async () => {
  await runDb();
});

describe('User', () => {
  it('registration', async () => {
    const password = '123';
    const passwordHash = await cryptography.generateHash(password);
    await authService.create('test@gmail.com', password, 'test');
    const user = (await authService.getByNickname('test')) as UserType;
    const userByEmail = (await authService.getByEmail('test@gmail.com')) as UserType;

    deepStrictEqual(user, userByEmail);
    deepStrictEqual(user.lvlPoint, 0);
    deepStrictEqual(user.money, 0);
    deepStrictEqual(user.popularPoint, 0);
    deepStrictEqual(user.role, 'USER');
    deepStrictEqual(user.email, 'test@gmail.com');
    deepStrictEqual(user.nickname, 'test');
    notDeepStrictEqual(user.passwordHash, passwordHash);
  });
  it('correct password', async () => {
    const hashPassword = await cryptography.generateHash('123');
    deepStrictEqual(true, await cryptography.correctPassword('123', hashPassword));
    deepStrictEqual(false, await cryptography.correctPassword('1234', hashPassword));
  });
});
