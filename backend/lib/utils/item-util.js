

// imports
import bs58 from 'bs58';
import { isEmpty, conforms, isString } from 'lodash';
import { createHmac } from 'crypto';

// local imports
import {
  hex_encoding,
  sha256_hash,
} from '../../model/consts';


export const isEventPredicate = conforms({
  type: isString,
});

export function isValid(param) {
  return !isEmpty(param) && param.length <= 300;
}

export function isNotValid(param) {
  return !isValid(param);
}

// Event FQN: event fully qualified name
export function formatEventFQN(event) {
  return `${event.trader_id}/${event.type}/${event.event_id}`;
}

export function uuidToBase58(uuidStr) {
  const stripped = uuidStr.replace(/-/g, '');
  const buffer = new Buffer(stripped, hex_encoding);
  return bs58.encode(buffer);
}

export function computeSignature(trader_id, event_id, message) {
  const secret = `${trader_id}_${event_id}`;
  return createHmac(sha256_hash, secret)
    .update(message)
    .digest(hex_encoding);
}
