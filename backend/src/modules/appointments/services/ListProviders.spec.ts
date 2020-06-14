import AppError from '@shared/errors/AppError';

import ListProvidersService from './ListProviders';
import FakeUsersRepository from '@modules/users/repositories/fakes/Users';

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list providers', async () => {
    const userOne = await fakeUserRepository.create({
      name: 'Mário Joaquim',
      email: 'mario.joaquim@gmail.com',
      password: '123456',
    });

    const userTwo = await fakeUserRepository.create({
      name: 'João da Silva',
      email: 'joao.silva@gobarber.com',
      password: '123456',
    });

    const userThree = await fakeUserRepository.create({
      name: 'Manoel Costa',
      email: 'manoel.costa@gobarber.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Gabriel Brunichaki',
      email: 'gabriel.brunichaki@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([userOne, userTwo, userThree]);
  });
});
