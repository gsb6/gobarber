import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointments';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointment';

import Appointment from '../entities/Appointment';

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
}

export default AppointmentsRepository;
