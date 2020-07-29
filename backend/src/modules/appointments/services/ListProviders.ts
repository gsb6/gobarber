import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsers';
import ICacheProvider from '@shared/container/providers/Cache/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const key = `providers-list:${user_id}`;

    const cachedUsers = await this.cacheProvider.recover<User[]>(key);

    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.usersRepository.findAllProviders({
      except: user_id,
    });

    await this.cacheProvider.save(key, classToClass(users));

    return users;
  }
}
