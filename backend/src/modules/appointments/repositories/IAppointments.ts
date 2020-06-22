import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointment';
import IFindAllByMonthlyAvailabilityDTO from '../dtos/IFindAllByMonthlyAvailability';
import IFindAllByDailyAvailabilityDTO from '../dtos/IFindAllByDailyAvailability';

export default interface IAppointmentsRepository {
  create(appointment: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllByMonthlyAvailability(
    data: IFindAllByMonthlyAvailabilityDTO,
  ): Promise<Appointment[]>;
  findAllByDailyAvailability(
    data: IFindAllByDailyAvailabilityDTO,
  ): Promise<Appointment[]>;
}
