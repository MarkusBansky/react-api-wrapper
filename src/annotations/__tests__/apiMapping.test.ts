import 'reflect-metadata';
import { ReactApiWrapper } from '../../index';
import { apiUrlKey } from '../../keys';
import apiMapping from '../apiMapping';

const URL = 'https://www.google.com';

class ExampleClass extends ReactApiWrapper.WrappingClass {
  @apiMapping(URL)
  articlesPage: any;
}

test('Test adding URL to the target', () => {
  let c = new ExampleClass();
  let url = Reflect.getMetadata(apiUrlKey, c, 'articlesPage');
  expect(url).toBe(URL);
});
