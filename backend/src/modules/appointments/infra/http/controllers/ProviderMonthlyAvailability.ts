import { Request, Response } from 'express';
import { container } from 'tsyringe';

import MonthlyAvailabilityService from '@modules/appointments/services/MonthlyAvailability';

export default class ProviderMonthlyAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { month, year } = request.body;

    const monthlyAvailability = container.resolve(MonthlyAvailabilityService);

    const availability = await monthlyAvailability.execute({
      provider_id: id,
      month,
      year,
    });

    return response.json(availability);
  }
}
