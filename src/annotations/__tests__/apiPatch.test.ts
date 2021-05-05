import 'reflect-metadata';
import { ReactApiWrapper } from '../../index';
import { apiMethodKey } from '../../keys';
import apiPatch from '../apiPatch';

const METHOD = 'PATCH';

class ExampleClass extends ReactApiWrapper.WrappingClass {
  @apiPatch()
  example: any;
}

test('Test the method PATCH annotation', () => {
  let c = new ExampleClass();
  let method = Reflect.getMetadata(apiMethodKey, c, 'example');
  expect(method).toBe(METHOD);
});
