import 'reflect-metadata';
import { apiUrlKey } from '../keys';

export default function apiMapping(url: string) {
  return Reflect.metadata(apiUrlKey, url);
}
