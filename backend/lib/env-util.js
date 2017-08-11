// imports
import AWS from 'aws-sdk';

// local imports
import s3Client from '../lib/s3-client';

const kms = new AWS.KMS();

exports.initEnvVar = (context, env_name, var_name) => {
  const value = process.env[env_name] || '';
  kms.decrypt({ CiphertextBlob: Buffer.from(value, 'base64') })
    .promise()
    .then(data => {
      context[var_name] = String(data.Plaintext);
      s3Client.refresh();
    })
    .catch(err => {
      console.error(`FAILED TO DECRYPT ${env_name}`);
      console.error(err);
      context[var_name] = 'DUMMY_VALUE';
    });
};
