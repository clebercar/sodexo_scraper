type Nullable = undefined | null;

export interface IRequest {
  cpf: string;
  password: string;
}

export interface IResponse {
  resume: {
    balance: string | Nullable;
    lastBenefit: string | Nullable;
    nextBenefit: string | Nullable;
  };
  card: {
    number: string | Nullable;
  };
}

export default interface IScraperProvider {
  extract({ cpf, password }: IRequest): Promise<IResponse>;
}
