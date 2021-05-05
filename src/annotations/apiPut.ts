import 'reflect-metadata';
import { apiMethodKey } from '../keys';

export default function apiPut() {
  return Reflect.metadata(apiMethodKey, 'PUT');
}
