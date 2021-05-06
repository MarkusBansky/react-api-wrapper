import 'reflect-metadata';
import { ReactApiWrapper } from '../../index';
import { apiHeadersKey } from '../../keys';
import apiHeaders from '../apiHeaders';

const HEADERS = ["header1", "header2", "header3"];

class ExampleClass extends ReactApiWrapper.WrappingClass {
  @apiHeaders(HEADERS)
  example: any;
}

test('Test the method PUT annotation', () => {
  let c = new ExampleClass();
  let h = Reflect.getMetadata(apiHeadersKey, c, 'example');
  expect(h.length).toBe(HEADERS.length);
  expect(h).toStrictEqual(HEADERS);
});
