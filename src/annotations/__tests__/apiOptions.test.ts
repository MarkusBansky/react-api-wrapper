import 'reflect-metadata';
import { ReactApiWrapper } from '../../index';
import { apiMethodKey } from '../../keys';
import { apiOptions } from '../apiOptions';

const METHOD = 'OPTIONS';

class ExampleClass extends ReactApiWrapper.WrappingClass {
  @apiOptions()
  example: any;
}

test('Test the method OPTIONS annotation', () => {
  let c = new ExampleClass();
  let method = Reflect.getMetadata(apiMethodKey, c, 'example');
  expect(method).toBe(METHOD);
});
