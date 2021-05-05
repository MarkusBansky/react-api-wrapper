import { immerable } from 'immer';
import toImmerable from '../toImmerable';

test('Test if toImmerable set the flag from immerjs', () => {
  let obj: any = { test: 'any' };

  expect(obj[immerable]).toBe(undefined);

  obj = toImmerable(obj);

  expect(obj[immerable]).toBe(true);
});
