import { getRepository, Repository } from 'typeorm';

import IUsersTokens from '@modules/users/repositories/IUsersTokens';

import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokens {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = await this.ormRepository.findOne({
      where: { token },
    });

    return user;
  }
}

export default UsersTokensRepository;
