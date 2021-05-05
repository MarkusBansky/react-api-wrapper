import 'reflect-metadata';
import { apiMethodKey } from '../keys';

export default function apiDelete() {
  return Reflect.metadata(apiMethodKey, 'DELETE');
}
