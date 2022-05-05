import { deepStrictEqual, notDeepStrictEqual } from 'assert';
import { User } from '../helpers/user';
import { cryptography } from '../application/cryptographyService';

describe('User', () => {
  it('valid save data', async () => {
    const password = '123';
    const passwordHash = await cryptography.generateHash(password);
    const user = await new User().createUser('test@gmail.com', password, 'test');
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
