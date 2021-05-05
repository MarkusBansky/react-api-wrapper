import { ApiMessages } from './types/apiMessage';
import toImmerable from './toImmerable';
import { ApiLoadings } from './types/apiLoading';
import { apiMethodKey, apiUrlKey } from './keys';
import axios, { AxiosResponse } from 'axios';
import produce from 'immer';

export namespace ReactApiWrapper {
  export class WrappingClass {
    [actionName: string]: number | string | Object | undefined | null;
  }

  export class WrappingStatic {
    messages: ApiMessages = toImmerable({});
    loadings: ApiLoadings = toImmerable({});
  }

  export type WrapperClassProps<T extends WrappingClass> = WrappingStatic & T;

  export type WrappedClassReducerAction = { type: string; response?: AxiosResponse; error?: any } & Object;

  export type WrappedClass<T extends WrappingClass> = {
    props: (state: T) => WrapperClassProps<T>;
    dispatch: (dispatch: any) => any;
    reducer: (state: WrapperClassProps<T>, action: WrappedClassReducerAction) => WrapperClassProps<T>;
  };

  export function wrapWithReactApi<T extends WrappingClass>(wrappingClass: new () => T): WrappedClass<T> {
    const wrappingClassObject = new wrappingClass();
    const properties: string[] = Object.keys(wrappingClassObject);

    const wrappedClass: WrappedClass<T> = {
      props: (state) => {
        const mappedState: WrapperClassProps<T> = toImmerable(new WrappingStatic()) as any;
        properties.forEach((p) => ((mappedState as any)[p] = state[p]));
        return mappedState;
      },
      dispatch: () => {},
      reducer: (s) => s,
    };

    wrappedClass.dispatch = (dispatch: any) => {
      const fs: any = {};

      properties.forEach((propertyKey: string) => {
        const apiUrl = Reflect.getMetadata(apiUrlKey, wrappingClassObject, propertyKey);
        const apiMethod = Reflect.getMetadata(apiMethodKey, wrappingClassObject, propertyKey);

        const apiRequestOptions = {
          method: apiMethod,
          url: apiUrl,
        };

        fs[propertyKey + 'Dispatch'] = () => {
          axios(apiRequestOptions)
            .then((value: AxiosResponse) =>
              dispatch({
                type: 'SUCCESS_' + propertyKey,
                response: value,
              }),
            )
            .catch((reason) =>
              dispatch({
                type: 'FAIL_' + propertyKey,
                error: reason,
              }),
            );

          return {
            type: 'REQUEST_' + propertyKey,
          };
        };
      });

      return fs;
    };

    wrappedClass.reducer = (state: WrapperClassProps<T>, action: WrappedClassReducerAction): WrapperClassProps<T> =>
      produce(state, (draft) => {
        properties.forEach((propertyKey) => {
          switch (action.type) {
            case 'REQUEST_' + propertyKey:
              draft.loadings[propertyKey] = true;
              draft.messages[propertyKey] = null;
              break;
            case 'SUCCESS_' + propertyKey:
              draft.loadings[propertyKey] = false;
              (draft as any)[propertyKey] = toImmerable(action.response?.data);
              break;
            case 'FAIL_' + propertyKey:
              draft.loadings[propertyKey] = false;
              draft.messages[propertyKey] = {
                type: 'ERROR',
                message: action.error,
              };
              break;
          }
        });
      });

    return wrappedClass;
  }
}
