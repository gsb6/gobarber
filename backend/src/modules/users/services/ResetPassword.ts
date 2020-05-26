import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/hash/models/IHashProvider';

import IUsersRepository from '../repositories/IUsers';
import IUsersTokensRepository from '../repositories/IUsersTokens';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareTime = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareTime)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generate(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
