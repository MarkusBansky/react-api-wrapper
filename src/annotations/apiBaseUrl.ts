import 'reflect-metadata';
import { apiBaseUrlKey } from '../keys';

export default function apiBaseUrl() {
  return Reflect.metadata(apiBaseUrlKey, true);
}
