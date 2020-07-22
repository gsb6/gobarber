import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DailyAvailabilityService from '@modules/appointments/services/DailyAvailability';

export default class ProviderDailyAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { day, month, year } = request.query;

    const dailyAvailability = container.resolve(DailyAvailabilityService);

    const availability = await dailyAvailability.execute({
      provider_id: id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
