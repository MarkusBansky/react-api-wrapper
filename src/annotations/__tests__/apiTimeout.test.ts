import 'reflect-metadata';
import { ReactApiWrapper } from '../../index';
import { apiTimeoutKey } from '../../keys';
import apiTimeout from '../apiTimeout';

const TIMEOUT = 60000;

class ExampleClass extends ReactApiWrapper.WrappingClass {
  @apiTimeout(TIMEOUT)
  example: any;
}

test('Test the method PUT annotation', () => {
  let c = new ExampleClass();
  let t = Reflect.getMetadata(apiTimeoutKey, c, 'example');
  expect(t).toBe(TIMEOUT);
});
