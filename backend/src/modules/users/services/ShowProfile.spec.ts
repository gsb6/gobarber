import AppError from '@shared/errors/AppError';

import ShowProfileService from './ShowProfile';
import FakeUsersRepository from '../repositories/fakes/Users';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show profile', async () => {
    const newUser = await fakeUserRepository.create({
      name: 'Gabriel Brunichaki',
      email: 'gabriel.brunichaki@gmail.com',
      password: '123456',
    });

    const userProfile = await showProfile.execute({
      user_id: newUser.id,
    });

    expect(userProfile.name).toBe('Gabriel Brunichaki');
    expect(userProfile.email).toBe('gabriel.brunichaki@gmail.com');
  });

  it('should not be able to show a non existing profile', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
