import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/appointments';
import CreateAppointmentService from '../services/CreateAppointment';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const allAppointments = await appointmentsRepository.find();

  return response.json(allAppointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const createAppointment = new CreateAppointmentService();

  const dateISO = parseISO(date);

  const appointment = await createAppointment.execute({
    provider_id,
    date: dateISO,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
