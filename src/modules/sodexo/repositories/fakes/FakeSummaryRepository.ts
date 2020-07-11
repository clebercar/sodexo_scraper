import ISummaryRepository from '@modules/sodexo/repositories/ISummaryRepository';
import ICreateSummaryDTO from '@modules/sodexo/dtos/ICreateSummaryDTO';

import Summary, {
  ISummary,
} from '@modules/sodexo/infra/mongoose/schemas/Summary';

class SummaryRepository implements ISummaryRepository {
  private summaries: ISummary[] = [];

  public async create(data: ICreateSummaryDTO): Promise<ISummary> {
    const summary = new Summary(data);

    this.summaries.push(summary);

    return summary;
  }
}

export default SummaryRepository;
