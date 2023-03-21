export interface OptionsObj {
  [prop: string]: string;
}

export interface GetRespObject {
  endpoint: string;
  options?: OptionsObj;
}

export enum Status {
  ok = 'ok',
  error = 'error',
  error_401 = 401,
  error_404 = 404,
}

export enum ENDPOINTS {
  sources = 'sources',
  everything = 'everything',
}
