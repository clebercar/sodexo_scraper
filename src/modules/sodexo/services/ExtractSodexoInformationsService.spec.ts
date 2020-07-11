import 'reflect-metadata';

import FakeSummaryRepository from '@modules/sodexo/repositories/fakes/FakeSummaryRepository';
import FakePuppeteerProvider from '@modules/sodexo/providers/ScraperProvider/fakes/FakePuppeteerProvider';
import ExtractSodexoInformationsService from './ExtractSodexoInformationsService';

let fakeSummaryRepository: FakeSummaryRepository;
let fakePuppeteerProvider: FakePuppeteerProvider;
let extractSodexoInformations: ExtractSodexoInformationsService;

describe('Given ExtractSodexoInformationsService', () => {
  it('should be able to create a new summary', async () => {
    fakeSummaryRepository = new FakeSummaryRepository();
    fakePuppeteerProvider = new FakePuppeteerProvider();

    extractSodexoInformations = new ExtractSodexoInformationsService(
      fakePuppeteerProvider,
      fakeSummaryRepository,
    );

    const summary = await extractSodexoInformations.execute({
      cpf: '111111111',
      password: '12345689',
    });

    expect(summary).toHaveProperty('_id');
  });
});
