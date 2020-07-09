import puppeteer, { Page } from 'puppeteer';
import IScraperProvider, { IRequest } from '../models/IScraperProvider';

class PuppeteerScraperProvider implements IScraperProvider {
  async extract({ cpf, password }: IRequest) {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=site-per-process'
      ]
    });

    const page = await browser.newPage();
    await page.goto('https://www.sodexobeneficios.com.br/sodexo-club/login/',
      { waitUntil: 'networkidle2' });

    await page.type('#cpfEmail', cpf);
    await page.type('#password', password);

    await Promise.all([
      page.click('#buttonLogin'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);

    try {
      const card = await this.cardInformations(page);

      await Promise.all([
        page.click('#cards .card-balance-link'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
      ]);

      const resume = await this.resume(page);

      await browser.close();
      return { resume, card }
    } catch (e) {
      throw new Error(e)
    }
  }

  private async resume(page: Page) {
    return page.evaluate(() => {
      const BALANCE_INFOMATIONS = document.querySelector('#divBalance')

      if(BALANCE_INFOMATIONS) {
        const balance = BALANCE_INFOMATIONS
          .querySelector('#balance')?.textContent

        const lastBenefit = BALANCE_INFOMATIONS
          .querySelector('#lastBenefit')?.textContent

        const nextBenefit = BALANCE_INFOMATIONS
          .querySelector('#nextBenefit')?.textContent

        return { balance, lastBenefit, nextBenefit }
      }

      throw new Error('Not possible to obtain information on the current balance.')
    });
  }

  private async cardInformations(page: Page) {
    return page.evaluate(() => {
      const CARD = document.querySelector('.info-card.pass-card.refeicao-pass')

      if(CARD) {
        const cardNumber = CARD.querySelector('.card-number')?.textContent

        return { card: { number: cardNumber } }
      }

      throw new Error('Not possible to obtain information on the card.')
    });
  }
}

export default PuppeteerScraperProvider;
