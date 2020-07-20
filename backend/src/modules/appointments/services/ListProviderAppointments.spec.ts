import ListProviderAppointmentsService from './ListProviderAppointments';

import FakeAppointmentsRepository from '../repositories/fakes/Appointments';
import FakeCacheProvider from '@shared/container/providers/Cache/fakes/FakeCacheProvider';

let listProviderAppointments: ListProviderAppointmentsService;

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it("should be able to list the provider's appointments on a specific day", async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 4, 20, 14),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 4, 20, 15),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'fake-provider-id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
