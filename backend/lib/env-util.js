// imports
import AWS from 'aws-sdk';

// local imports
import consts from '../model/consts';

const kms = new AWS.KMS({
  region: consts.region
});

export function initEnvVar(context, env_name, var_name) {

  console.log('HERE Fuck shit '+env_name+' var '+var_name);

}


// exports.initEnvVar = function (context, env_name, var_name) {


// exports.initEnvVar = function (context, env_name, var_name) {
//   const value = process.env[env_name] || '';
//   kms.decrypt({ CiphertextBlob: Buffer.from(value, 'base64') })
//     .promise()
//     .then(data => {
//       context[var_name] = String(data.Plaintext);
//       s3Client.refresh();
//     })
//     .catch(err => {
//       console.error(`FAILED TO DECRYPT ${env_name}`);
//       console.error(err);
//       context[var_name] = 'DUMMY_VALUE';
//     });
// };
