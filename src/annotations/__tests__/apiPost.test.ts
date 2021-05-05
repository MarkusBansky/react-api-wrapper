import 'reflect-metadata';
import { ReactApiWrapper } from '../../index';
import { apiMethodKey } from '../../keys';
import apiPost from '../apiPost';

const METHOD = 'POST';

class ExampleClass extends ReactApiWrapper.WrappingClass {
  @apiPost()
  example: any;
}

test('Test the method POST annotation', () => {
  let c = new ExampleClass();
  let method = Reflect.getMetadata(apiMethodKey, c, 'example');
  expect(method).toBe(METHOD);
});
