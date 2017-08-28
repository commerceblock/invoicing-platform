// imports
import AWS from 'aws-sdk';
import { createHmac } from 'crypto';

// local imports
import consts from '../../model/consts';
import { extract } from '../utils/env-util';

var s3 = null;

if (process.env.IS_OFFLINE) {
  s3 = new AWS.S3({
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:8000'),
    accessKeyId: 'DUMMY',
    secretAccessKey: 'DUMMY'
  });
} else {
  // TODO: workaround - refresh manually
  try {
    init();
  } catch (err) {
    console.error('FAILED TO INIT S3 CLIENT');
    console.error(err);
  }
}

var creds = {
  storage_access_key: null,
  storage_secret_key: null
};

// workaround to init s3 client from KMS creds
function refresh() {
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

export function generateSignedGetUrl(bucket, key) {
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: 15 * 60
  };
  return s3.getSignedUrl('getObject', params);
}

export function generateSignedPutUrl(bucket, key, type) {
  const params = {
    Bucket: bucket,
    Key: key,
    ACL: 'authenticated-read',
    ContentType: type,
    Expires: 15 * 60
  };
  return s3.getSignedUrl('putObject', params);
}
