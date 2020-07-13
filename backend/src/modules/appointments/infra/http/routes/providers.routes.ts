import { Router } from 'express';

import ProvidersController from '../controllers/Providers';
import ProviderDailyAvailabilityController from '../controllers/ProviderDailyAvailability';
import ProviderMonthlyAvailabilityController from '../controllers/ProviderMonthlyAvailability';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDailyAvailabilityController = new ProviderDailyAvailabilityController();
const providerMonthlyAvailabilityController = new ProviderMonthlyAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:id/monthly-availability',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  providerDailyAvailabilityController.index,
);
providersRouter.get(
  '/:id/daily-availability',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  providerMonthlyAvailabilityController.index,
);

export default providersRouter;
