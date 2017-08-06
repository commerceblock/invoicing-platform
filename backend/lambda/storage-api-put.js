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
    name: 'storage-api-put'
  });

exports.put = (event, context, callback) => {
  const request_id = uuid.createOrderedId();
  log.info({
    request_id,
    event
  }, 'start');
  const file_id = event.pathParameters && event.pathParameters[storage_columns.file_id],
    file_name = event.pathParameters && event.pathParameters[storage_columns.file_name];
  if (itemUtil.isNotValid(file_id) || itemUtil.isNotValid(file_name)) {
    const response = httpUtil.toResponse(httpStatus.BAD_REQUEST);
    log.warn({
      request_id,
      response
    }, 'Failed to parse request params - end');
    return callback(null, response);
  } else {
    fileStorage
      .loadFile(file_id)
      .then(file => {
        if (file) {
          //Already exists
          const response = httpUtil.toResponse(httpStatus.CONFLICT);
          log.warn({
            request_id,
            response
          }, 'Failed to save file, file already exists - end');
          return callback(null, response);
        } else {
          const file_extention = httpUtil.parseExtension(file_name),
            file_s3_key = `${uuid.createId()}-${file_name}`,
            file_s3_bucket = consts.storage_bucket,
            content_type = httpUtil.resolveMimeType(file_extention);
          const payload = {
            file_id,
            file_name,
            file_extention,
            file_s3_key,
            file_s3_bucket,
            content_type
          }
          return fileStorage.saveFile(payload)
        }
      })
      .then(fileItem => {
        const acl = consts.default_acl,
            success_action_status = consts.default_success_action_status,
            policy = s3Client.getPolicy(
              fileItem.file_s3_bucket, 
              fileItem.file_s3_key, 
              acl, 
              fileItem.content_type, 
              success_action_status
            ),
            policy_base64 = s3Client.policyToBase64(policy),
            signature = s3Client.signPolicyB64(policy_base64);
            url = s3Client.getBucketUrl(fileItem.file_s3_bucket);
        const response = Object.assign({
          aws_access_key_id: consts.storage_access_key,
          acl,
          success_action_status,
          policy_base64,
          signature,
          url
        }, payload);
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
