import { ApiMessages } from './types/apiMessage';
import toImmerable from './toImmerable';
import { ApiLoadings } from './types/apiLoading';
import { apiBaseUrlKey, apiHeadersKey, apiMethodKey, apiTimeoutKey, apiUrlKey } from './keys';
import axios, { AxiosResponse } from 'axios';
import produce, { immerable } from 'immer';

export namespace ReactApiWrapper {
  export class WrappingClass {
    [actionName: string]: number | string | Object | undefined | null;
  }

  export class BaseWrappingClass extends WrappingClass {
    baseUrl?: string | undefined | null;
  }

  export class WrappingStatic {
    [immerable] = true;
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

  export function wrapWithReactApi<T extends WrappingClass | BaseWrappingClass>(wrappingClass: new () => T): WrappedClass<T> {
    const wrappingClassObject = new wrappingClass();
    const properties: string[] = Object.keys(wrappingClassObject);

    const wrappedClass: WrappedClass<T> = {
      props: (state) => {
        const mappedState: WrapperClassProps<T> = toImmerable(new WrappingStatic()) as any;
        properties.forEach((p) => ((mappedState as any)[p] = state[p]));
        return mappedState;
      },
      dispatch: () => {
      },
      reducer: (s) => s,
    };

    wrappedClass.dispatch = (dispatch: any) => {
      const fs: any = {};

      properties.forEach((propertyKey: string) => {
        const apiUrl = Reflect.getMetadata(apiUrlKey, wrappingClassObject, propertyKey);
        const apiMethod = Reflect.getMetadata(apiMethodKey, wrappingClassObject, propertyKey);
        const apiTimeout = Reflect.getMetadata(apiTimeoutKey, wrappingClassObject, propertyKey);
        const apiHeaders = Reflect.getMetadata(apiHeadersKey, wrappingClassObject, propertyKey);
        const apiBaseUrl = Reflect.getMetadata(apiBaseUrlKey, wrappingClassObject, propertyKey);

        const apiRequestOptions = {
          method: apiMethod,
          url: apiUrl,
          timeout: apiTimeout,
          baseUrl: apiBaseUrl,
          headers: apiHeaders,
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

    wrappedClass.reducer = (
      state: WrapperClassProps<T> = new WrappingStatic() as any,
      action: WrappedClassReducerAction,
    ): WrapperClassProps<T> => produce(state, (draft) => {
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
            (draft as any)[propertyKey] = null;
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
