
// imports
import AWS from 'aws-sdk';

// local imports
import consts from '../../model/consts';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'env-util' });

const kms = new AWS.KMS();

export function extract(env_name, value) {
  return kms.decrypt({ CiphertextBlob: Buffer.from(value, 'base64') })
    .promise()
    .then(data => {
      return String(data.Plaintext);
    })
    .catch(err => {
      log.error({ err }, `FAILED TO DECRYPT ${env_name}`);
      return 'INVALID';
    });
}
