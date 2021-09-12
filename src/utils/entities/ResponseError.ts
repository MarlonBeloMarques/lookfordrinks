import { AxiosError } from 'axios';

const defaultErrorMessage =
  'Unexpected error. Please check your internet and try again.';

export default class ResponseError {
  message: string;
  code: number;

  constructor({ response }: AxiosError) {
    this.message = response?.data?.message || defaultErrorMessage;
    this.code = response?.status || 0;
  }
}
