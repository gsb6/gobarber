import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointments';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointment';

import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const newAppointment = new Appointment();

    Object.assign(newAppointment, {
      id: uuid(),
      provider_id,
      date,
    });

    this.appointments.push(newAppointment);

    return newAppointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find((appointment) =>
      isEqual(appointment.date, date),
    );
  }
}

export default FakeAppointmentsRepository;
