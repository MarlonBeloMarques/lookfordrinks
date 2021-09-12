import nock from 'nock';
import axios, { AxiosError } from 'axios';
import ResponseError from '../ResponseError';

jest.mock('axios', () => ({
  get: jest.fn().mockRejectedValue(new Error('Async error')),
  isAxiosError: () => jest.fn(),
}));

describe('Entities: ResponseError', () => {
  it('when instance method then return default values', async () => {
    const expectedError =
      'Unexpected error. Please check your internet and try again.';
    const expectedHttpStatus = 0;

    // given
    nock('http://mock-api.com.br')
      .get(`/entity`)
      .reply(expectedHttpStatus, expectedError);

    try {
      // when
      await axios.get('http://mock-api.com.br/entity');
    } catch (error) {
      let result = { code: 0, message: '' };

      if (axios.isAxiosError(error)) {
        result = new ResponseError(error);

        // then
        expect(result.code).toEqual(expectedHttpStatus);
        expect(result.message).toEqual(expectedError);
      }
    }
  });

  it('when instance method then return error values', async () => {
    const expectedError = 'Error message.';
    const expectedHttpStatus = 500;

    // given
    nock('http://mock-api.com.br')
      .get(`/entity`)
      .reply(expectedHttpStatus, expectedError);

    // when
    try {
      await axios.get('http://mock-api.com.br/entity');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const newError = {
          ...error,
          response: {
            status: 500,
            data: {
              message: 'Error message.',
            },
          },
        } as AxiosError;

        const result = new ResponseError(newError);

        // then
        expect(result.code).toEqual(expectedHttpStatus);
        expect(result.message).toEqual(expectedError);
      }
    }
  });
});
