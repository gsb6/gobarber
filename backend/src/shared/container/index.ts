import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointments';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointments';

import IUsersRepository from '@modules/users/repositories/IUsers';
import UsersRepository from '@modules/users/infra/typeorm/repositories/Users';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokens';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokens';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
