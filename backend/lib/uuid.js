import uuid from 'uuid';
import bs58 from 'bs58';

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
