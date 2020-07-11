import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ExtractSodexoInformationsService from '@modules/sodexo/services/ExtractSodexoInformationsService';

export default class ScrappersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const extractSodexoInformationsService = container.resolve(
      ExtractSodexoInformationsService,
    );

    const data = await extractSodexoInformationsService.execute({
      cpf,
      password,
    });

    return response.json(data);
  }
}
