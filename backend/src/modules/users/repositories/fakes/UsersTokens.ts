import { uuid } from 'uuidv4';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokens';

import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const newUserToken = new UserToken();

    Object.assign(newUserToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.usersTokens.push(newUserToken);

    return newUserToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find((t) => t.token === token);

    return userToken;
  }
}

export default FakeUsersTokensRepository;
