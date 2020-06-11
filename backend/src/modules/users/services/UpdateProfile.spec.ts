import AppError from '@shared/errors/AppError';

import UpdateProfileService from './UpdateProfile';

import FakeUsersRepository from '../repositories/fakes/Users';
import FakeHashProvider from '../providers/hash/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const newUser = await fakeUserRepository.create({
      name: 'Gabriel Brunichaki',
      email: 'gabriel.brunichaki@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: newUser.id,
      name: 'Gabriel de Salles',
      email: 'gabriel.salles@gmail.com',
    });

    expect(updatedUser.name).toBe('Gabriel de Salles');
    expect(updatedUser.email).toBe('gabriel.salles@gmail.com');
  });

  it('should not be able to update a non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Gabriel de Salles',
        email: 'gabriel.salles@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update email to an existing one', async () => {
    await fakeUserRepository.create({
      name: 'Gabriel Brunichaki',
      email: 'gabriel.brunichaki@gmail.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Gabriel Salles',
      email: 'gabriel.salles@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Gabriel Brunichaki',
        email: 'gabriel.brunichaki@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const newUser = await fakeUserRepository.create({
      name: 'Gabriel Brunichaki',
      email: 'gabriel.brunichaki@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: newUser.id,
      name: 'Gabriel de Salles',
      email: 'gabriel.salles@gmail.com',
      oldPassword: '123456',
      password: '123123',
    });

    expect(updatedUser.name).toBe('Gabriel de Salles');
    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const newUser = await fakeUserRepository.create({
      name: 'Gabriel Brunichaki',
      email: 'gabriel.brunichaki@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: newUser.id,
        name: 'Gabriel de Salles',
        email: 'gabriel.salles@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const newUser = await fakeUserRepository.create({
      name: 'Gabriel Brunichaki',
      email: 'gabriel.brunichaki@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: newUser.id,
        name: 'Gabriel de Salles',
        email: 'gabriel.salles@gmail.com',
        oldPassword: 'wrong old password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
