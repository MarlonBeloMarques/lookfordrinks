import nock from 'nock';
import { BreweriesApi } from '~/api';
import breweriesExpectedData from './fixtures/breweriesList';

const makeMocks = () => {
  return {
    latitude: 37.78825,
    longitude: -122.4324,
  };
};

describe('Api: listBreweriesByDistance', () => {
  test('should get a list of breweries with success', async () => {
    // given
    nock('http://mock-api.com.br')
      .get(
        `/breweries?by_dist=${makeMocks().latitude},${makeMocks().longitude}`,
      )
      .reply(200, breweriesExpectedData);
    // when
    const data = await BreweriesApi.listBreweriesByDistance(
      makeMocks().latitude,
      makeMocks().longitude,
      'http://mock-api.com.br',
    );
    // then
    expect(data).toEqual(breweriesExpectedData);
  });

  test('should get an error exception message', async () => {
    // given
    const expectedError = {
      message: 'Unexpected error. Please check your internet and try again.',
    };
    const expectedHttpStatus = 0;
    nock('http://mock-api.com.br')
      .get(
        `/breweries?by_dist=${makeMocks().latitude},${makeMocks().longitude}`,
      )
      .reply(expectedHttpStatus, expectedError);
    // when
    const data = await BreweriesApi.listBreweriesByDistance(
      makeMocks().latitude,
      makeMocks().longitude,
      'http://mock-api.com.br',
    );
    // then
    expect(data).toEqual(expectedError);
  });
});
