// imports
import AWS from 'aws-sdk';
import { createHmac } from 'crypto';

// local imports
import consts from '../model/consts';

var s3 = null;
var storage_access_key = null;
var storage_secret_key = null;

// woraround to init s3 client from KMS creds
function refresh () {
  s3 = new AWS.S3({
    accessKeyId: consts.storage_access_key,
    secretAccessKey: consts.storage_secret_key,
    region: consts.region,
  });
};

function init() {

}

// TODO: workaround - refresh manually

exports.generateSignedGetUrl = function (bucket, key) {
  const params = { Bucket: bucket, Key: key };
  return s3.getSignedUrl('getObject', params);
};

exports.generateSignedPutUrl = function (bucket, key) {
  const params = { Bucket: bucket, Key: key };
  return s3.getSignedUrl('putObject', params);
};

exports.getPolicy = function (bucket, key, acl, content_type, success_action_status) {
  const expiration = new Date(Date.now() + consts.default_token_duration_ms).toISOString();
  return {
    expiration,
    conditions: [
      { bucket },
      ['starts-with', '$key', `${key}`],
      { acl },
      ['starts-with', '$Content-Type', content_type],
      { success_action_status },
    ],
  };
};

exports.policyToBase64 = function (policy) {
  const polictStr = JSON.stringify(policy);
  return new Buffer(polictStr, consts.default_encoding).toString(consts.base64_encoding);
};

exports.signPolicyB64 = function (policyB64) {
  const hmac = createHmac(consts.sha1_hash, consts.storage_secret_key);
  hmac.update(new Buffer(policyB64, consts.default_encoding));
  return hmac.digest(consts.base64_encoding);
};

exports.getBucketUrl = function (bucket) {
  return `https://${bucket}.s3.amazonaws.com/`;
};
