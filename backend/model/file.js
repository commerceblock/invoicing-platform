'use strict';

// imports
const dynamoose = require('../lib/dynamoose'),
  Schema = dynamoose.Schema;

// local imports
const consts = require('./consts'),
  storage_columns = consts.storage_columns;

// schema defintion
const FileSchema = new Schema({
  [storage_columns.file_id]: {
    type: String,
    hashKey: true
  },
  [storage_columns.file_s3_key]: {
    type: String
  },
  [storage_columns.file_s3_bucket]: {
    type: String
  }
});

const File = dynamoose.model('storage', FileSchema);
module.exports = Event;
