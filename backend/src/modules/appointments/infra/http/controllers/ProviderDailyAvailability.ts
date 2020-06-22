import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DailyAvailabilityService from '@modules/appointments/services/DailyAvailability';

export default class ProviderDailyAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { day, month, year } = request.body;

    const dailyAvailability = container.resolve(DailyAvailabilityService);

    const availability = await dailyAvailability.execute({
      provider_id: id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
