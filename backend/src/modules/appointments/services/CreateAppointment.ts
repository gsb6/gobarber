import 'reflect-metadata';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointments';
import INotificationsRepository from '@modules/notifications/repositories/INotifications';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const parsedDate = startOfHour(date);

    if (isBefore(parsedDate, Date.now())) {
      throw new AppError("You can't create an appointment on past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment for yourself.");
    }

    if (getHours(parsedDate) < 8 || getHours(parsedDate) > 17) {
      throw new AppError(
        "You can't create an appointment before 8am or after 5pm",
      );
    }

    const findSameDate = await this.appointmentsRepository.findByDate(
      parsedDate,
    );

    if (findSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: parsedDate,
    });

    const formattedDate = format(parsedDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${formattedDate}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
