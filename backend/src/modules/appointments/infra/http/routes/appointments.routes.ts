import { Router } from 'express';

import AppointmentsController from '../controllers/Appointments';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const allAppointments = await appointmentsRepository.find();

//   return response.json(allAppointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
