import 'reflect-metadata';
import { apiMethodKey } from '../keys';

export function apiOptions() {
  return Reflect.metadata(apiMethodKey, 'OPTIONS');
}
