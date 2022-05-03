export enum AllritesFunctions {
  AuthAllrites = 'authAllrites',
}

export interface AuthAllritesReturns {
  accessToken: string;
  tokenType: string;
  expires: number;
}
