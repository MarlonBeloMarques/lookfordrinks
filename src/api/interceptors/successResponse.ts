import { AxiosResponse } from 'axios';

const successResponse = (response: AxiosResponse<any>): AxiosResponse<any> =>
  response;

export default successResponse;
