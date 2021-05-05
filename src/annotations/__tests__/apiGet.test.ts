import 'reflect-metadata';
import { ReactApiWrapper } from '../../index';
import { apiMethodKey } from '../../keys';
import { apiGet } from '../apiGet';

const METHOD = 'GET';

class ExampleClass extends ReactApiWrapper.WrappingClass {
  @apiGet()
  example: any;
}

test('Test the method GET annotation', () => {
  let c = new ExampleClass();
  let method = Reflect.getMetadata(apiMethodKey, c, 'example');
  expect(method).toBe(METHOD);
});
