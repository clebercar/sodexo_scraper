export interface IRequest {
  cpf: string;
  password: string;
}

export interface IScraperResponse {
  balance: string;
  lastBenefit: string;
  nextBenefit: string;
  cardNumber: string;
}

export default interface IScraperProvider {
  extract({ cpf, password }: IRequest): Promise<IScraperResponse>;
}
