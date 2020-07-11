import { container } from 'tsyringe';

import IScraperProvider from './ScraperProvider/models/IScraperProvider';
import PuppeteerProvider from './ScraperProvider/implementations/PuppeteerProvider';

container.registerSingleton<IScraperProvider>(
  'PuppeteerProvider',
  PuppeteerProvider,
);
