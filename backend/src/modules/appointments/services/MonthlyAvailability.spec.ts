import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/Appointments';
import MonthlyAvailabilityService from './MonthlyAvailability';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let monthlyAvailability: MonthlyAvailabilityService;

describe('MonthlyAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    monthlyAvailability = new MonthlyAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the monthly availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      date: new Date(2020, 4, 20, 8),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      date: new Date(2020, 4, 20, 9),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      date: new Date(2020, 4, 20, 10),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      date: new Date(2020, 4, 20, 11),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      date: new Date(2020, 4, 20, 12),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      date: new Date(2020, 4, 20, 13),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      date: new Date(2020, 4, 20, 14),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      date: new Date(2020, 4, 20, 15),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      date: new Date(2020, 4, 20, 16),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      date: new Date(2020, 4, 20, 17),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      date: new Date(2020, 4, 21, 9, 0, 0),
    });

    const availability = await monthlyAvailability.execute({
      provider_id: 'fake-provider-id',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
