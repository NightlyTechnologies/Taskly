import { hash, verify } from 'argon2';
import IHashProvider from '../models/IHashProvider';

export default class Argon2HashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, {
      timeCost: process.env.NUMBER_OF_ROUNDS,
    });
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return verify(hashed, payload);
  }
}
