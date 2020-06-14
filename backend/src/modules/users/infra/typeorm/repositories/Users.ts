import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsers';
import ICreateUserDTO from '@modules/users/dtos/ICreateUser';
import IFindAllProviders from '@modules/users/dtos/IFindAllProviders';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    except,
  }: IFindAllProviders): Promise<User[]> {
    if (!except) {
      return this.ormRepository.find();
    }

    const providers = await this.ormRepository.find({
      where: {
        id: Not(except),
      },
    });

    return providers;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create(user: ICreateUserDTO): Promise<User> {
    const newUser = this.ormRepository.create(user);

    await this.ormRepository.save(newUser);

    return newUser;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
