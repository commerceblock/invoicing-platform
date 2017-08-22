// imports
import AWS from 'aws-sdk';
import { createHmac } from 'crypto';

// local imports
import consts from '../model/consts';
import { extract } from '../lib/env-util';

var s3 = null;
var creds = {
  storage_access_key: null,
  storage_secret_key: null
};

// woraround to init s3 client from KMS creds
function refresh () {
  s3 = new AWS.S3({
    accessKeyId: creds.storage_access_key,
    secretAccessKey: creds.storage_secret_key
  });
};

function initCreds(name, encryptedValue) {
  return extract(name, encryptedValue)
    .then(value => {
      creds[name] = value
    });
}

function init() {
  const all_creds = Promise.all([
    initCreds('storage_access_key', process.env.CB_STORAGE_ACCESS_KEY),
    initCreds('storage_secret_key', process.env.CB_STORAGE_SECRET_KEY)
  ]);

  all_creds
    .then(done => {
      refresh();
    })
    .catch(err => {
      console.error('FAILED TO INIT S3 CLIENT');
      console.error(err);
    });
}

// TODO: workaround - refresh manually
try {
  init();
} catch (err) {
  console.error('FAILED TO INIT S3 CLIENT');
  console.error(err);
}

export function generateSignedGetUrl(bucket, key) {
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: 15*60
  };
  return s3.getSignedUrl('getObject', params);
};

export function generateSignedPutUrl(bucket, key, type) {
  const params = {
    Bucket: bucket,
    Key: key,
    ACL: 'authenticated-read',
    ContentType: type,
    Expires: 15*60
  };
  return s3.getSignedUrl('putObject', params);
};

export function getPolicy(bucket, key, acl, content_type, success_action_status) {
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

export function policyToBase64(policy) {
  const polictStr = JSON.stringify(policy);
  return new Buffer(polictStr, consts.default_encoding).toString(consts.base64_encoding);
};

export function signPolicyB64(policyB64) {
  const hmac = createHmac(consts.sha1_hash, consts.storage_secret_key);
  hmac.update(new Buffer(policyB64, consts.default_encoding));
  return hmac.digest(consts.base64_encoding);
};

export function getBucketUrl(bucket) {
  return `https://${bucket}.s3.amazonaws.com/`;
};
