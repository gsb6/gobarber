import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointments';
import ICacheProvider from '@shared/container/providers/Cache/models/ICacheProvider';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    const cachedAppointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!cachedAppointments) {
      const appointments = await this.appointmentsRepository.findAllByDailyAvailability(
        { provider_id, day, month, year },
      );

      await this.cacheProvider.save(cacheKey, classToClass(appointments));

      return appointments;
    }

    await this.cacheProvider.save(cacheKey, classToClass(cachedAppointments));

    return cachedAppointments;
  }
}
