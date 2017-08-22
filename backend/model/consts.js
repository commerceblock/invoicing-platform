// env variables
export const env_name = process.env.CB_ENV_NAME;

// storage env variables
export const storage_bucket = `${env_name}-storage`;
export const storage_access_key = process.env.CB_STORAGE_ACCESS_KEY;
export const storage_secret_key = process.env.CB_STORAGE_SECRET_KEY;

// storage settings
export const default_acl = 'private';
export const default_success_action_status = '200';
export const default_token_duration_ms = 15 * 60 * 1000;

// generic consts
export const utf_8_encoding = 'utf-8';
export const base64_encoding = 'base64';
export const hex_encoding = 'hex';
export const sha1_hash = 'sha1';
export const sha256_hash = 'sha256';
export const default_encoding = utf_8_encoding;

// event columns
export const event_columns = {
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
export const event_type = {
  profile_created: 'profile_created',
  invoice_created: 'invoice_created',
  receipt_redeemed: 'receipt_redeemed',
  invoice_link_generated: 'invoice_link_generated',
};

// storage columns
export const storage_columns = {
  file_id: 'file_id',
  file_s3_key: 'file_s3_key',
  file_s3_bucket: 'file_s3_bucket',
  file_name: 'file_name',
};
