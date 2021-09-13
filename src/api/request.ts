import axios, { AxiosInstance } from 'axios';
import { Env } from '~/utils';
import { successResponse } from './interceptors';

const baseURL: string = Env.API_BASE_PATH;

const request = (url = baseURL): AxiosInstance =>
  axios.create({
    baseURL: url,
  });

request().interceptors.response.use(successResponse, () => {});

request().interceptors.request.use(() => {});

export default request;
