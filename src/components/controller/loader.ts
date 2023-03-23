/* eslint-disable no-console */
import { MINUS_ONE, ZERO } from '../../constants/constants';
import { GetRespObject, OptionsObj, Status } from '../../types/types';

class Loader {
  private baseLink: string;

  private options: OptionsObj;

  constructor(baseLink: string, options: OptionsObj) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResponse<Data>(
    { endpoint, options = {} }: GetRespObject,
    callback: (data: Readonly<Data>) => void = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  public errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === Status.error_401 || res.status === Status.error_404)
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`
        );
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: OptionsObj, endpoint: string): string {
    const urlOptions: OptionsObj = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach(key => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(ZERO, MINUS_ONE);
  }

  private load<Data>(
    method: string,
    endpoint: string,
    callback: (data: Data) => void,
    options: OptionsObj = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then(res => res.json())
      .then(data => callback(data))
      .catch(err => console.error(err));
  }
}

export default Loader;
