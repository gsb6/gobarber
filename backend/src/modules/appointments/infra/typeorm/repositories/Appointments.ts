import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointments';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointment';
import IFindAllByMonthlyAvailability from '@modules/appointments/dtos/IFindAllByMonthlyAvailability';

import Appointment from '../entities/Appointment';
import IFindAllByDailyAvailabilityDTO from '@modules/appointments/dtos/IFindAllByDailyAvailability';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create(
    appointment: ICreateAppointmentDTO,
  ): Promise<Appointment> {
    const newAppointment = this.ormRepository.create(appointment);

    await this.ormRepository.save(newAppointment);

    return newAppointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const selectedAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return selectedAppointment;
  }

  public async findAllByMonthlyAvailability({
    provider_id,
    month,
    year,
  }: IFindAllByMonthlyAvailability): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const filteredAppointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (dateColumn) =>
            `to_char(${dateColumn}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return filteredAppointments;
  }

  public async findAllByDailyAvailability({
    provider_id,
    day,
    month,
    year,
  }: IFindAllByDailyAvailabilityDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const filteredAppointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (dateColumn) =>
            `to_char(${dateColumn}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return filteredAppointments;
  }
}

export default AppointmentsRepository;
