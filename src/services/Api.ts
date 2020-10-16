import { AxiosResponse } from 'axios';

export default class Api {
  public static handleResponseData(response: AxiosResponse): any {
    switch (response.status) {
      case 200:
      case 201:
        return response.data;

      // BAD REQUEST
      case 400:
        throw {
          status: response.status,
          error: 'Bad Request',
          message: 'The request data is invalid.',
          body: response,
        };

      // NOT FOUND
      case 404:
        throw {
          status: response.status,
          error: 'Not Found',
          message: 'The resource could not be found',
        };

      case 500:
        throw {
          status: response.status,
          error: 'Internal Server Error',
          message: 'There is something wrong with the server at the moment.',
        };

      default:
        throw {
          status: 0,
          error: 'Unknown Error',
          message: 'Oops! Please check back in a moment.',
        };
    }
  }
}
