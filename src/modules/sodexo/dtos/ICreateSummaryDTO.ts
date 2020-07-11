import { ISummary } from '@modules/sodexo/infra/mongoose/schemas/Summary';

export default interface ICreateSummaryDTO {
  balance: ISummary['balance'];
  lastBenefit: ISummary['lastBenefit'];
  nextBenefit: ISummary['nextBenefit'];
  cardNumber: ISummary['cardNumber'];
}
