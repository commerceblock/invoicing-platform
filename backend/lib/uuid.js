'use strict';

const uuid = require('uuid');
const bs58 = require('bs58');

exports.createId = () => {
  // random uuid
  const orderId = uuid.v4();
  return toBase58(orderId);
}

exports.createOrderedId = () => {
  // time ordered uuid
  const eventId = uuid.v1();
  return toBase58(eventId);
}

function toBase58(uuidStr) {
  const stripped = uuidStr.replace(/-/g,'');
  const buffer = new Buffer(stripped, 'hex');
  return bs58.encode(buffer);
}
