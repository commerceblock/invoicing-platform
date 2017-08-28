
// imports
import uuid from 'uuid';

// local imports
import { uuidToBase58 } from './item-util';

export function createId() {
  // random uuid
  const id = uuid.v4();
  return uuidToBase58(id);
}

export function createOrderedId() {
  // TODO: fix later
  // time ordered uuid
  return new Date().toISOString();
}
