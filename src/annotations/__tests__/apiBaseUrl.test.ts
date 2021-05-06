import 'reflect-metadata';
import { ReactApiWrapper } from '../../index';
import apiPut from '../apiPut';
import apiBaseUrl from '../apiBaseUrl';
import { apiBaseUrlKey } from '../../keys';

const BASE_URL = 'BASE_URL';

class ExampleClassWithoutUrl extends ReactApiWrapper.WrappingClass {
  @apiPut()
  example: any;
}

class ExampleClassWithUrl extends ReactApiWrapper.WrappingClass {
  @apiBaseUrl()
  baseUrl = BASE_URL;

  @apiPut()
  example: any;
}

test('Test the method BaseUrl annotation without', () => {
  let c = new ExampleClassWithoutUrl();
  let bu = Reflect.getMetadata(apiBaseUrlKey, c, 'baseUrl');
  expect(bu).toBe(undefined);
  expect(c.baseUrl).toBe(undefined);
});

test('Test the method BaseUrl annotation with', () => {
  let c = new ExampleClassWithUrl();
  let bu = Reflect.getMetadata(apiBaseUrlKey, c, 'baseUrl');
  expect(bu).toBe(true);
  expect(c.baseUrl).toBe(BASE_URL);
});
