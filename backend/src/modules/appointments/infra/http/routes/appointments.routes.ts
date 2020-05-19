import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointments';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointment';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const allAppointments = await appointmentsRepository.find();

  return response.json(allAppointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const dateISO = parseISO(date);

  const appointment = await createAppointment.execute({
    provider_id,
    date: dateISO,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
