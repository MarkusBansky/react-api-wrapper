import 'reflect-metadata';
import { ReactApiWrapper } from '../../index';
import { apiMethodKey } from '../../keys';
import apiDelete from '../apiDelete';

const METHOD = 'DELETE';

class ExampleClass extends ReactApiWrapper.WrappingClass {
  @apiDelete()
  example: any;
}

test('Test the method DELETE annotation', () => {
  let c = new ExampleClass();
  let method = Reflect.getMetadata(apiMethodKey, c, 'example');
  expect(method).toBe(METHOD);
});
