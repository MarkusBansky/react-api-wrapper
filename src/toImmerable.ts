import { immerable } from 'immer';

export default function toImmerable<T>(obj: T): T {
  return { [immerable]: true, ...obj } as any;
}
