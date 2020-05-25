import FakeUsersRepository from '../repositories/fakes/Users';
import FakeHashProvider from '../providers/hash/fakes/FakeHashProvider';

import CreateUserService from '../services/CreateUser';

import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const newUser = await createUser.execute({
      name: 'João da Silva',
      email: 'joaodasilva@example.com',
      password: '123456',
    });

    expect(newUser).toHaveProperty('id');
  });

  it('should not to be able to create two users with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'João da Silva',
      email: 'joaodasilva@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'João da Silva',
        email: 'joaodasilva@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
