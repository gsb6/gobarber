import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/Appointments';
import DailyAvailabilityService from './DailyAvailability';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let dailyAvailability: DailyAvailabilityService;

describe('DailyAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    dailyAvailability = new DailyAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the daily availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 4, 20, 14),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 4, 20, 16),
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 20, 11).getTime());

    const availability = await dailyAvailability.execute({
      provider_id: 'fake-provider-id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 17, available: true },
      ]),
    );
  });
});
