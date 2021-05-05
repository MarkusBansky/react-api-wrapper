import { ReactApiWrapper } from '../index';
import apiMapping from '../annotations/apiMapping';
import { apiGet } from '../annotations/apiGet';
import WrappingClass = ReactApiWrapper.WrappingClass;
import wrapWithReactApi = ReactApiWrapper.wrapWithReactApi;

class ExampleClass extends WrappingClass {
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
