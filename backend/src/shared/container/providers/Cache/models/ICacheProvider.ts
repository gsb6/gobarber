export default interface ICacheProvider {
  save(key: string, value: string): Promise<void>;
  recover(ket: string): Promise<string | null>;
  invalidate(ket: string): Promise<void>;
}
