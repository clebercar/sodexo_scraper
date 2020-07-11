import puppeteer, { Page } from 'puppeteer';

import AppError from '@shared/errors/AppError';
import IScraperProvider, {
  IRequest,
  IScraperResponse,
} from '../models/IScraperProvider';

class PuppeteerProvider implements IScraperProvider {
  async extract({ cpf, password }: IRequest): Promise<IScraperResponse> {
    const browser = await puppeteer.launch({
      executablePath: process.env.CHROMIUM_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://www.sodexobeneficios.com.br/sodexo-club/login/', {
      waitUntil: 'networkidle2',
    });

    await page.type('#cpfEmail', cpf);
    await page.type('#password', password);

    await Promise.all([
      page.click('#buttonLogin'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);

    const cardNumber = await this.cardInformations(page);

    await Promise.all([
      page.click('#cards .card-balance-link'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);

    const summary = await this.summary(page);
    await browser.close();

    return { ...summary, cardNumber };
  }

  private async summary(page: Page) {
    return page.evaluate(() => {
      const BALANCE_INFOMATIONS = document.querySelector('#divBalance');

      const BALANCE = BALANCE_INFOMATIONS?.querySelector('#balance')
        ?.textContent;
      const LAST_BENEFIT = BALANCE_INFOMATIONS?.querySelector('#lastBenefit')
        ?.textContent;
      const NEXT_BENEFIT = BALANCE_INFOMATIONS?.querySelector('#nextBenefit')
        ?.textContent;

      if (BALANCE && LAST_BENEFIT && NEXT_BENEFIT)
        return {
          balance: BALANCE,
          lastBenefit: LAST_BENEFIT,
          nextBenefit: NEXT_BENEFIT,
        };

      throw new AppError(
        'Not possible to obtain information on the current balance.',
      );
    });
  }

  private async cardInformations(page: Page) {
    return page.evaluate(() => {
      const CARD = document.querySelector('.info-card.pass-card.refeicao-pass');
      const CARD_NUMBER = CARD?.querySelector('.card-number')?.textContent;

      if (CARD_NUMBER) return CARD_NUMBER;

      throw new AppError('Not possible to obtain information on the card.');
    });
  }
}

export default PuppeteerProvider;
