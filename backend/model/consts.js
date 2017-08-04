'use strict';

// env variables
const env_name = exports.env_name = process.env.ENV_NAME;
exports.storage_access_key = process.env.STORAGE_ACCESS_KEY;
exports.storage_secret_Key = process.env.STORAGE_SECRET_KEY;

// resource names
exports.storage_bucket = `${env_name}-storage`;

// event columns
exports.event_columns = {
  trader_id: 'trader_id',
  event_id: 'event_id',
  type: 'type',
  timestamp: 'timestamp',
  data: 'data'
};

// event types
exports.event_type = {};

// storage columns
exports.storage_columns = {
  file_id: 'file_id',
  file_s3_key: 'file_s3_key'
};
