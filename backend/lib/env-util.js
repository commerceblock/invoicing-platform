// imports
import AWS from 'aws-sdk';

// local imports
import consts from '../model/consts';

const kms = new AWS.KMS();

export function extract(env_name, value) {
  return kms.decrypt({ CiphertextBlob: Buffer.from(value, 'base64') })
    .promise()
    .then(data => {
      console.log('DECreypt '+env_name);
      return String(data.Plaintext);
    })
    .catch(err => {
      console.error(`FAILED TO DECRYPT ${env_name}`);
      console.error(err);
      return 'INVALID';
    });
}
