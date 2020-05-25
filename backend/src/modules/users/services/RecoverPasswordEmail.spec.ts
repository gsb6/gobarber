import FakeUsersRepository from '../repositories/fakes/Users';
import FakeUsersTokensRepository from '../repositories/fakes/UsersTokens';

import FakeMailProvider from '@shared/providers/mail/fakes/FakeMailProvider';

import RecoverPasswordEmailService from './RecoverPasswordEmail';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeMailProvider: FakeMailProvider;

let recoverPasswordEmail: RecoverPasswordEmailService;

describe('RecoverPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    recoverPasswordEmail = new RecoverPasswordEmailService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover password using email', async () => {
    const sendMailFunction = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'João da Silva',
      email: 'joaodasilva@example.com',
      password: '123456',
    });

    await recoverPasswordEmail.execute({
      email: 'joaodasilva@example.com',
    });

    expect(sendMailFunction).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      recoverPasswordEmail.execute({
        email: 'joaodasilva@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateTokenFunction = jest.spyOn(
      fakeUsersTokensRepository,
      'generate',
    );

    const newUser = await fakeUsersRepository.create({
      name: 'João da Silva',
      email: 'joaodasilva@example.com',
      password: '123456',
    });

    await recoverPasswordEmail.execute({
      email: 'joaodasilva@example.com',
    });

    expect(generateTokenFunction).toHaveBeenCalledWith(newUser.id);
  });
});
