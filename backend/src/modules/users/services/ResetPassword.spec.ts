import FakeUsersRepository from '../repositories/fakes/Users';
import FakeUsersTokensRepository from '../repositories/fakes/UsersTokens';

import ResetPasswordService from './ResetPassword';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;

let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
    );
  });

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João da Silva',
      email: 'joaodasilva@example.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '123456',
      token,
    });

    const userWithNewToken = await fakeUsersRepository.findById(user.id);

    expect(userWithNewToken?.password).toBe('123456');
  });
});
