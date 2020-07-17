import AppError from '@shared/errors/AppError';

import UpdateUserAvatarService from '../services/UpdateUserAvatar';

import FakeUsersRepository from '../repositories/fakes/Users';
import FakeStorageProvider from '@shared/container/providers/Storage/fakes/FakeStorageProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update an user avatar', async () => {
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
    await expect(
      updateUserAvatar.execute({
        user_id: '0',
        filename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when uploads a new one', async () => {
    const deleteFileFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

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
