import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

export const cryptography = {
  async generateHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buf = (await promisify(scrypt)(password, salt, 64)) as Buffer;
    return `${salt}:${buf.toString('hex')}`;
  },

  async correctPassword(password: string, hash: string): Promise<boolean> {
    const [salt, hashedPassword] = hash.split(':');
    const buf = (await promisify(scrypt)(password, salt, 64)) as Buffer;
    return timingSafeEqual(Buffer.from(hashedPassword, 'hex'), buf);
  },
};
