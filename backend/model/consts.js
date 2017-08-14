

// local imports
const envUtil = require('../lib/env-util');

// env variables
const env_name = exports.env_name = process.env.CB_ENV_NAME;
exports.region = process.env.CB_REGION || 'liberty-middle-east';

// storage env variables
envUtil.initEnvVar(exports, 'CB_STORAGE_ACCESS_KEY', 'storage_access_key');
envUtil.initEnvVar(exports, 'CB_STORAGE_SECRET_KEY', 'storage_secret_key');
exports.storage_bucket = `${env_name}-storage`;

// storage settings
exports.default_acl = 'private';
exports.default_success_action_status = '200';
exports.default_token_duration_ms = 15 * 60 * 1000;

// generic consts
const utf_8_encoding = exports.utf_8_encoding = 'utf-8';
exports.base64_encoding = 'base64';
exports.hex_encoding = 'hex';
exports.sha1_hash = 'sha1';
exports.sha256_hash = 'sha256';
exports.default_encoding = utf_8_encoding;

// event columns
exports.event_columns = {
  // general
  event_id: 'event_id',
  type: 'type',
  timestamp: 'timestamp',
  data: 'data',

  // trade
  trader_id: 'trader_id',
  invoice_id: 'invoice_id',
  title: 'title',
  file_ids: 'file_ids',
  contract_base_pk: 'contract_base_pk',
  contract_encryption_key: 'contract_encryption_key',
  btc_amount: 'btc_amount',
  external_reference_id: 'external_reference_id',
  root_contract_base_pk_signature: 'root_contract_base_pk_signature',
};

// event types
exports.event_type = {
  profile_created: 'profile_created',
  invoice_created: 'invoice_created',
  receipt_redeemed: 'receipt_redeemed',
  invoice_link_generated: 'invoice_link_generated',
};

// storage columns
exports.storage_columns = {
  file_id: 'file_id',
  file_s3_key: 'file_s3_key',
  file_s3_bucket: 'file_s3_bucket',
  file_name: 'file_name',
};
