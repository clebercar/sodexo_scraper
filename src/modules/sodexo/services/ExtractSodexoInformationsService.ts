import { injectable, inject } from 'tsyringe';
import ISummaryRespository from '../repositories/ISummaryRepository';

import IScraperProvider, {
  IRequest,
  IScraperResponse,
} from '../providers/ScraperProvider/models/IScraperProvider';

@injectable()
class ExtractSodexoInformationsService {
  constructor(
    @inject('PuppeteerProvider')
    private puppeteerProvider: IScraperProvider,

    @inject('SummaryRepository')
    private summaryRepository: ISummaryRespository,
  ) {}

  public async execute({ cpf, password }: IRequest): Promise<IScraperResponse> {
    const data = await this.puppeteerProvider.extract({ cpf, password });

    return this.summaryRepository.create(data);
  }
}

export default ExtractSodexoInformationsService;
