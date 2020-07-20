import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const value = this.cache[key];

    if (!value) return null;

    return JSON.parse(value) as T;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keysWithPrefix = Object.keys(this.cache).filter((key) =>
      key.startsWith(`${prefix}:`),
    );

    keysWithPrefix.forEach((key) => delete this.cache[key]);
  }
}
