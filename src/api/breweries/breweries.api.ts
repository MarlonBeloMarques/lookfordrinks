import axios from 'axios';
import { Env, ResponseError } from '~/utils';
import request from '../request';

const baseURL: string = Env.API_BASE_PATH;

export default class BreweriesApi {
  static listBreweriesByDistance = async (
    latitude: number,
    longitude: number,
    url = baseURL,
  ): Promise<any> => {
    try {
      const { data } = await request(url).get(
        `/breweries?by_dist=${latitude},${longitude}`,
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ResponseError(error);
      }
    }
  };

  static searchBreweries = async (
    searchValue: string,
    url = baseURL,
  ): Promise<any> => {
    try {
      const { data } = await request(url).get(
        `/breweries/search?query=${searchValue}`,
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ResponseError(error);
      }
    }
  };
}
