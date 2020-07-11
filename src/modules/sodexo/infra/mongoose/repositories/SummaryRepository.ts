import { Model } from 'mongoose';
import ISummaryRepository from '@modules/sodexo/repositories/ISummaryRepository';
import ICreateSummaryDTO from '@modules/sodexo/dtos/ICreateSummaryDTO';

import Summary, { ISummary } from '../schemas/Summary';

class SummaryRepository implements ISummaryRepository {
  private schema: Model<ISummary>;

  constructor() {
    this.schema = Summary;
  }

  public async create(data: ICreateSummaryDTO): Promise<ISummary> {
    return this.schema.create(data);
  }
}

export default SummaryRepository;
