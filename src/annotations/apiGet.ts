import 'reflect-metadata';
import { apiMethodKey } from '../keys';

export function apiGet() {
  return Reflect.metadata(apiMethodKey, 'GET');
}
