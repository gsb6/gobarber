import { uuid } from 'uuidv4';
import { isEqual, getDate, getMonth, getYear } from 'date-fns';

import Appointment from '../../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointments';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointment';
import IFindAllByMonthlyAvailabilityDTO from '@modules/appointments/dtos/IFindAllByMonthlyAvailability';
import IFindAllByDailyAvailabilityDTO from '@modules/appointments/dtos/IFindAllByDailyAvailability';

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

  public async findAllByMonthlyAvailability({
    provider_id,
    month,
    year,
  }: IFindAllByMonthlyAvailabilityDTO): Promise<Appointment[]> {
    const filteredAppointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return filteredAppointments;
  }

  public async findAllByDailyAvailability({
    provider_id,
    day,
    month,
    year,
  }: IFindAllByDailyAvailabilityDTO): Promise<Appointment[]> {
    const filteredAppointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return filteredAppointments;
  }
}

export default FakeAppointmentsRepository;
