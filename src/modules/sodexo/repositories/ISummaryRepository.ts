import ICreateSummaryDTO from '../dtos/ICreateSummaryDTO';
import { ISummary } from '../infra/mongoose/schemas/Summary';

export default interface ISummaryRepository {
  create(data: ICreateSummaryDTO): Promise<ISummary>;
}
