import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUser';
import IFindAllProviders from '../dtos/IFindAllProviders';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProviders): Promise<User[]>;
  create(user: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
