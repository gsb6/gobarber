import { hash, compare as bcryptCompare } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generate(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    return bcryptCompare(payload, hashed);
  }
}
