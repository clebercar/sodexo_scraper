export interface IRequest{
  cpf: string;
  password: string;
}

export default interface IScraperProvider {
  extract({ cpf, password }: IRequest): Promise<Object>;
}
