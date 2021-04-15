import { container } from 'tsyringe';

import '@modules/users/providers';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import CitiesRepository from '@modules/cities/infra/typeorm/repositories/CitiesRepository';

import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';
import ActivitiesRepository from '@modules/activities/infra/typeorm/repositories/ActivitiesRepository';

import ISub_ActivitiesRepository from '@modules/activities/repositories/ISub_ActivitiesRepository';
import Sub_ActivitiesRepository from '@modules/activities/infra/typeorm/repositories/Sub_ActivitiesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository,
);

container.registerSingleton<IActivitiesRepository>(
  'ActivitiesRepository',
  ActivitiesRepository,
);

container.registerSingleton<ISub_ActivitiesRepository>(
  'Sub_ActivitiesRepository',
  Sub_ActivitiesRepository,
);
