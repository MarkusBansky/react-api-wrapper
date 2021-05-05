import 'reflect-metadata';
import { apiMethodKey } from '../keys';

export default function apiPost() {
  return Reflect.metadata(apiMethodKey, 'POST');
}
