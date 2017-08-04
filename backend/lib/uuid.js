'use strict';

const uuid = require('uuid');
const bs58 = require('bs58');

exports.createId = () => {
  // random uuid
  const id = uuid.v4();
  return toBase58(id);
}

exports.createOrderedId = () => {
  // time ordered uuid
  const orderedId = uuid.v1();
  return toBase58(orderedId);
}

function toBase58(uuidStr) {
  const stripped = uuidStr.replace(/-/g,'');
  const buffer = new Buffer(stripped, 'hex');
  return bs58.encode(buffer);
}
