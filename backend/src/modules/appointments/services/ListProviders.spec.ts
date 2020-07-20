import ListProvidersService from './ListProviders';

import FakeUsersRepository from '@modules/users/repositories/fakes/Users';
import FakeCacheProvider from '@shared/container/providers/Cache/fakes/FakeCacheProvider';

let listProviders: ListProvidersService;

let fakeUserRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProvider,
    );
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
