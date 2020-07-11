import AppError from '@shared/errors/AppError';
import IScraperProvider, {
  IRequest,
  IScraperResponse,
} from '../models/IScraperProvider';

class FakePuppeteerProvider implements IScraperProvider {
  private data: IScraperResponse = {
    balance: 'BALANCE',
    cardNumber: 'CARD_NUMBER',
    lastBenefit: 'LAST_BENEFIT',
    nextBenefit: 'NEXT_BENEFIT',
  };

  async extract({ cpf, password }: IRequest): Promise<IScraperResponse> {
    const summary = await this.summary();
    const cardNumber = await this.cardInformations();

    return { ...summary, cardNumber };
  }

  private async summary() {
    if (this.data.balance && this.data.lastBenefit && this.data.nextBenefit)
      return {
        balance: this.data.lastBenefit,
        lastBenefit: this.data.lastBenefit,
        nextBenefit: this.data.nextBenefit,
      };

    throw new AppError(
      'Not possible to obtain information on the current balance.',
    );
  }

  private async cardInformations() {
    if (this.data.cardNumber) return this.data.cardNumber;

    throw new AppError('Not possible to obtain information on the card.');
  }
}

export default FakePuppeteerProvider;
