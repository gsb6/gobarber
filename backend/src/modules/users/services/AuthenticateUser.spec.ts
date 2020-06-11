import FakeUsersRepository from '../repositories/fakes/Users';
import FakeHashProvider from '../providers/hash/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUser';
import CreateUserService from './CreateUser';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
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
    await expect(
      authenticateUser.execute({
        email: 'joaodasilva@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to authenticate a wrong password', async () => {
    await createUser.execute({
      name: 'João da Silva',
      email: 'joaodasilva@example.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'joaodasilva@example.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
