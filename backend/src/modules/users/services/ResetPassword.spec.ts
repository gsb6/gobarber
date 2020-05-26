import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/Users';
import FakeUsersTokensRepository from '../repositories/fakes/UsersTokens';
import FakeHashProvider from '../providers/hash/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPassword';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeHashProvider: FakeHashProvider;

let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João da Silva',
      email: 'joaodasilva@example.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    const generateHashFunction = jest.spyOn(fakeHashProvider, 'generate');

    await resetPassword.execute({
      password: '654321',
      token,
    });

    const userWithNewToken = await fakeUsersRepository.findById(user.id);

    expect(generateHashFunction).toBeCalledWith('654321');
    expect(userWithNewToken?.password).toBe('654321');
  });

  it('should not be able to to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-user',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUsersTokensRepository.generate(
      'non-existing-user-id',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password after 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João da Silva',
      email: 'joaodasilva@example.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const futureDate = new Date();

      return futureDate.setHours(futureDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '654321',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
