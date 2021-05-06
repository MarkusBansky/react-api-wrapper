import { ReactApiWrapper } from '../index';
import apiMapping from '../annotations/apiMapping';
import { apiGet } from '../annotations/apiGet';
import wrapWithReactApi = ReactApiWrapper.wrapWithReactApi;
import BaseWrappingClass = ReactApiWrapper.BaseWrappingClass;
import toImmerable from '../toImmerable';
import WrappingStatic = ReactApiWrapper.WrappingStatic;
import axios from 'axios';

class ExampleClass extends BaseWrappingClass {
  @apiGet()
  @apiMapping('https://www.bbc.com')
  bbc: string | null;

  @apiGet()
  @apiMapping('https://www.google.com')
  google: string | null;

  constructor() {
    super();
    this.bbc = null;
    this.google = null;
  }
}

test('Test if wrapper function is ran without the errors', () => {
  wrapWithReactApi(ExampleClass);
});

test('Test if wrapper returns a decent mapStateToProps function', () => {
  const wrappedClass = wrapWithReactApi(ExampleClass);
  const mapStateToProps = wrappedClass.props;

  // check arguments
  expect(mapStateToProps.length).toBe(1);

  const BBC = 'BBC';
  const GOOGLE = 'GOOGLE';
  const state = { bbc: BBC, google: GOOGLE };

  const mappedProps = mapStateToProps(state);

  expect(mappedProps['bbc']).toBe(BBC);
  expect(mappedProps['google']).toBe(GOOGLE);
});

test('Test if the wrapper returns a decent mapDispatchToProps function', () => {
  const wrappedClass = wrapWithReactApi(ExampleClass);
  const mapDispatchToProps = wrappedClass.dispatch;
  const dispatchFunction = (params: any) => console.log(params);

  // check arguments
  expect(mapDispatchToProps.length).toBe(1);

  const mappedProps = mapDispatchToProps(dispatchFunction);

  expect(typeof mappedProps).toBe('object');
  expect(Object.keys(mappedProps).length).toBe(Object.keys(new ExampleClass()).length);

  Object.entries(mappedProps).map((f) => {
    expect(f[0].endsWith('Dispatch')).toBeTruthy();
    expect(typeof f[1]).toBe('function');
  });
});

test('Test whether mapDispatchToProps is callable and correct', async () => {
  const wrappedClass = wrapWithReactApi(ExampleClass);
  const mapDispatchToProps = wrappedClass.dispatch;
  const dispatchFunction = (params: any) => console.log(params);

  // check arguments
  expect(mapDispatchToProps.length).toBe(1);

  const mappedProps = mapDispatchToProps(dispatchFunction);

  // try the function
  expect(mappedProps['googleDispatch']()).toStrictEqual({ type: 'REQUEST_google' });
});

test('Test whether reducer is callable and correct', async () => {
  const wrappedClass = wrapWithReactApi(ExampleClass);
  const reducer = wrappedClass.reducer;

  // check arguments
  expect(reducer.length).toBe(2);

  const response2 = toImmerable({ b: 2 });
  const response3 = toImmerable({ c: 3 });

  const initialValues = {...toImmerable(new ExampleClass()), ...toImmerable(new WrappingStatic())};

  // test 1
  const state1 = reducer(initialValues as any, { type: 'REQUEST_bbc' });
  expect(state1.loadings["bbc"]).toEqual(true);
  expect(state1.messages["bbc"]).toEqual(null);

  // test 2
  const state2 = reducer(initialValues as any, { type: 'SUCCESS_bbc', response: {data: response2} as any });
  expect(state2.loadings["bbc"]).toEqual(false);
  expect(state2.messages["bbc"]).toEqual(undefined);
  expect(state2.bbc).toEqual(response2);

  // test 3
  const state3 = reducer(initialValues as any, { type: 'FAIL_bbc', error: response3 as any });
  expect(state3.loadings["bbc"]).toEqual(false);
  expect(state3.messages["bbc"]?.type).toEqual("ERROR");
  expect(state3.messages["bbc"]?.message).toEqual(response3);
  expect(state3.bbc).toEqual(null);
});

// test('Test axios reducer functions', async () => {
//   jest.mock('axios');
//   const wrappedClass = wrapWithReactApi(ExampleClass);
//   const reducer = wrappedClass.reducer;
//   const mapDispatchToProps = wrappedClass.dispatch;
//   const dispatchFunction = (params: any) => console.log(params);
//   const mappedProps = mapDispatchToProps(dispatchFunction);
//
//   const successResponse = toImmerable({ code: 200, data: { value: 'success' } });
//   const errorResponse = toImmerable({ code: 200, error: 'error' });
//
//   // mock for success response first
//   (axios as any).get.mockImplementationOnce(() => Promise.resolve(successResponse));
//   await expect(mappedProps["googleDispatch"]()).resolves.toBeCalled();
//
//   // mock for error
//   (axios as any).get.mockImplementationOnce(() => Promise.reject(errorResponse));
//   await expect(mappedProps["googleDispatch"]()).rejects.toBeCalled();
// });
