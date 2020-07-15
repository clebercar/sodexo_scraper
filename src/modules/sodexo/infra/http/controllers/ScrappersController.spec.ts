import request from 'supertest';
import faker from 'faker';
import { cpf } from 'cpf-cnpj-validator';

import App from '@shared/infra/http/App';
import ExtractSodexoInformationsService from '@modules/sodexo/services/ExtractSodexoInformationsService';
import {
  IRequest,
  IScraperResponse,
} from '@modules/sodexo/providers/ScraperProvider/models/IScraperProvider';

describe('Given the scrapper endpoint', () => {
  describe('POST /', () => {
    let response;

    beforeAll(() => {
      jest
        .spyOn(ExtractSodexoInformationsService.prototype, 'execute')
        .mockImplementation(
          async (_data: IRequest): Promise<IScraperResponse> => ({
            balance: faker.finance.amount(),
            lastBenefit: faker.finance.currencyCode(),
            nextBenefit: faker.finance.currencyCode(),
            cardNumber: faker.random.number().toString(),
          }),
        );
    });

    it('should return status created when data is successfully stored', async () => {
      response = await request(App).post('/scrappers').send({
        password: faker.internet.password(),
        cpf: cpf.generate(),
      });

      expect(response.status).toBe(201);
    });

    it('should return status 400 when CPF is invalid', async () => {
      response = await request(App).post('/scrappers').send({
        password: faker.internet.password(),
        cpf: faker.random.number(),
      });

      expect(response.status).toBe(400);
    });
  });
});
