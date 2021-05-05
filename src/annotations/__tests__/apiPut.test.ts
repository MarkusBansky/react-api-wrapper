import 'reflect-metadata';
import { ReactApiWrapper } from '../../index';
import { apiMethodKey } from '../../keys';
import apiPut from '../apiPut';

const METHOD = 'PUT';

class ExampleClass extends ReactApiWrapper.WrappingClass {
  @apiPut()
  example: any;
}

test('Test the method PUT annotation', () => {
  let c = new ExampleClass();
  let method = Reflect.getMetadata(apiMethodKey, c, 'example');
  expect(method).toBe(METHOD);
});
