import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/providers/mail/models/IMailProvider';

import IUsersRepository from '../repositories/IUsers';
import IUsersTokensRepository from '../repositories/IUsersTokens';

interface IRequest {
  email: string;
}

@injectable()
class RecoverPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User dos not exists.');
    }

    const { token: newToken } = await this.usersTokensRepository.generate(
      user.id,
    );

    console.log(newToken);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha: ${newToken}`,
    );
  }
}

export default RecoverPasswordEmailService;
