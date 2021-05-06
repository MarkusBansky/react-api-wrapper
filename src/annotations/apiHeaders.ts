import 'reflect-metadata';
import { apiHeadersKey } from '../keys';

export default function apiHeaders(headers: string[]) {
  return Reflect.metadata(apiHeadersKey, headers);
}
