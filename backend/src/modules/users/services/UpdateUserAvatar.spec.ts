import AppError from '@shared/errors/AppError';

import UpdateUserAvatarService from '../services/UpdateUserAvatar';

import FakeUsersRepository from '../repositories/fake/users';
import FakeStorageProvider from '@shared/providers/storage/fakes/FakeStorageProvider';

describe('UpdateUserAvatar', () => {
  it('should be able to update an user avatar', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const newUser = await fakeUserRepository.create({
      name: 'Gabriel Brunichaki',
      email: 'gabriel.brunichaki@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: newUser.id,
      filename: 'avatar.jpg',
    });

    expect(newUser.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update an non existing user avatar', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: '0',
        filename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when uploads a new one', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFileFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const newUser = await fakeUserRepository.create({
      name: 'Gabriel Brunichaki',
      email: 'gabriel.brunichaki@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: newUser.id,
      filename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: newUser.id,
      filename: 'avatar2.jpg',
    });

    expect(deleteFileFunction).toHaveBeenCalledWith('avatar.jpg');
    expect(newUser.avatar).toBe('avatar2.jpg');
  });
});
