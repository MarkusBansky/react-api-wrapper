import 'reflect-metadata';
import { apiTimeoutKey } from '../keys';

export default function apiTimeout(timeout: number) {
  return Reflect.metadata(apiTimeoutKey, timeout);
}
