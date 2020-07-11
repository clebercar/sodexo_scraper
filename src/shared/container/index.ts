import { container } from 'tsyringe';

import '@modules/sodexo/providers';

import ISummaryRepository from '@modules/sodexo/repositories/ISummaryRepository';
import SummaryRepository from '@modules/sodexo/infra/mongoose/repositories/SummaryRepository';

container.registerSingleton<ISummaryRepository>(
  'SummaryRepository',
  SummaryRepository,
);
