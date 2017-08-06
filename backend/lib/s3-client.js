'use strict';

// imports
const AWS = require('aws-sdk'),
  crypto = require('crypto');

// local imports
const consts = require('../model/consts');

const s3 = new AWS.S3({
  accessKeyId: consts.storage_access_key,
  secretAccessKey: consts.storage_secret_key,
  region: consts.region
});

exports.getPresignedUrl = function (bucket, key) {
  const params = { Bucket: bucket, Key: key };
  return s3.getSignedUrl('getObject', params);
};

exports.getPolicy = function (bucket, key, acl, content_type, success_action_status) {
  const expiration = new Date(Date.now() + consts.default_token_duration_ms).toISOString();
  return policy = {
    expiration,
    conditions: [
      { bucket },
      ['starts-with', '$key', `${key}`],
      { acl },
      ['starts-with', '$Content-Type', content_type],
      { success_action_status }
    ],
  };
}

exports.policyToBase64 = function (policy) {
  const polictStr = JSON.stringify(policy);
  return new Buffer(polictStr, consts.default_encoding).toString('base64');
};

exports.signPolicyB64 = function (policyB64) {
  const hmac = crypto.createHmac('sha1', consts.storage_secret_key);
  hmac.update(new Buffer(policyB64, consts.default_encoding));
  return hmac.digest('base64');
};

exports.getBucketUrl = function (bucket) {
  return `https://${bucket}.s3.amazonaws.com/`;
};
