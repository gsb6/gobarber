import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsers';
import ICreateUserDTO from '@modules/users/dtos/ICreateUser';

import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public async create(user: ICreateUserDTO): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, { id: uuid() }, user);

    this.users.push(newUser);

    return newUser;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex((u) => u.id === user.id);

    this.users[userIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
