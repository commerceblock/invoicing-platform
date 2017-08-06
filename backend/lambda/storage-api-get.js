'use strict';

// imports
const _ = require('lodash'),
  httpStatus = require('http-status-codes');

// local imports
const consts = require('../model/consts'),
  uuid = require('../lib/uuid'),
  httpUtil = require('../lib/http-util'),
  itemUtil = require('../lib/item-util'),
  fileStorage = require('../lib/file-storage'),
  s3Client = require('../lib/s3-client'),
  storage_columns = consts.storage_columns;

// logging
const bunyan = require('bunyan'),
  log = bunyan.createLogger({
    name: 'storage-api-get'
  });

exports.get = (event, context, callback) => {
  const request_id = uuid.createOrderedId();
  log.info({
    request_id,
    event
  }, 'start');
  const file_id = event.pathParameters && event.pathParameters[storage_columns.file_id];
  if (itemUtil.isNotValid(file_id)) {
    const response = httpUtil.toResponse(httpStatus.BAD_REQUEST);
    log.warn({
      request_id,
      response
    }, 'Failed to parse file_id param - end');
    return callback(null, response);
  } else {
    fileStorage
      .loadFile(file_id)
      .then(file => {
        const response = buildResponse(file);
        log.info({
          request_id,
          http_response: response
        }, "success - end");
        return callback(null, response);
      })
      .catch(error => {
        const response = httpUtil.toResponse(httpStatus.SERVICE_UNAVAILABLE);
        log.error({
          request_id,
          error,
          http_response: response
        }, 'Failed to load file - end');
        return callback(null, response);
      });
  }
};

function buildResponse(file) {
  if (file) {
    const url = s3Client.getPresignedUrl(file.file_s3_bucket, file.file_s3_key);
    return httpUtil.toRedirectResponse(url);
  } else {
    return httpUtil.toResponse(httpStatus.NOT_FOUND);
  }
}
