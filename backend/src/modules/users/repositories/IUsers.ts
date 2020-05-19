import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUser';

export default interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
