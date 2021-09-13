import { AxiosResponse } from 'axios';
import successResponse from '../successResponse';

type MakeMoker = {
  value: AxiosResponse;
};

const makeMocks = (): MakeMoker => {
  const value: AxiosResponse = {
    data: 'any_value',
    status: 200,
    statusText: 'any_string',
    headers: {},
    config: {},
  };

  return { value };
};

describe('Interceptor: successResponse', () => {
  test('should call successResponse when correct value then return correct value', () => {
    // given
    const { value } = makeMocks();
    // when
    const response = successResponse(value);
    // then
    expect(response).toEqual(value);
  });
});
