import CreateAppointmentService from './CreateAppointment';
import FakeAppointmentsRepository from '../repositories/fakes/Appointments';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const newAppointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456789',
    });

    expect(newAppointment).toHaveProperty('id');
  });

  it('should not to be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 1, 1, 12);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456788',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
