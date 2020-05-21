import FakeUsersRepository from '../repositories/fake/users';
import FakeHashProvider from '../providers/hash/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUser';
import CreateUserService from './CreateUser';

import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to authenticate an user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const newUser = await createUser.execute({
      name: 'João da Silva',
      email: 'joaodasilva@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'joaodasilva@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(newUser);
  });

  it('should not to be able to authenticate a non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'joaodasilva@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to authenticate a wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const newUser = await createUser.execute({
      name: 'João da Silva',
      email: 'joaodasilva@example.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'joaodasilva@example.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
