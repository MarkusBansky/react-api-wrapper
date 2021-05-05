import 'reflect-metadata';
import { apiMethodKey } from '../keys';

export default function apiPatch() {
  return Reflect.metadata(apiMethodKey, 'PATCH');
}
