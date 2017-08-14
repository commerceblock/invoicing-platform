// imports
import httpStatus from 'http-status-codes';

// local imports
import consts from '../model/consts';
import httpUtil from '../lib/http-util';
import s3Client from '../lib/s3-client';
import { createOrderedId, createId } from '../lib/uuid';
import { isNotValid } from '../lib/item-util';
import { loadFile, saveFile } from '../lib/file-storage';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'storage-api-put' });

exports.put = (event, context, callback) => {
  const request_id = createOrderedId();
  log.info({
    request_id,
    event,
  }, 'start');
  const file_id = event.pathParameters && event.pathParameters[consts.storage_columns.file_id],
    request = JSON.parse(event.body) || {},
    file_name = request[consts.storage_columns.file_name];
  if (isNotValid(file_id) || isNotValid(file_name)) {
    const response = httpUtil.toResponse(httpStatus.BAD_REQUEST);
    log.warn({
      request_id,
      response,
    }, 'Failed to parse request params - end');
    return callback(null, response);
  }
  loadFile(file_id)
    .then(file => {
      if (file) {
        // Already exists
        const response = httpUtil.toResponse(httpStatus.CONFLICT);
        log.warn({
          request_id,
          response,
        }, 'Failed to save file, file already exists - end');
        return callback(null, response);
      }
      const file_s3_bucket = consts.storage_bucket,
        file_s3_key = `${createId()}-${file_name}`,
        file_extention = httpUtil.parseExtension(file_name),
        content_type = httpUtil.resolveMimeType(file_extention);
      const payload = {
        file_id,
        file_name,
        file_extention,
        file_s3_key,
        file_s3_bucket,
        content_type,
      };
      return saveFile(payload);
    })
    .then(fileItem => {
      const acl = consts.default_acl,
        success_action_status = consts.default_success_action_status,
        policy = s3Client.getPolicy(
          fileItem.file_s3_bucket,
          fileItem.file_s3_key,
          acl,
          fileItem.content_type,
          success_action_status,
        ),
        policy_base64 = s3Client.policyToBase64(policy),
        signature = s3Client.signPolicyB64(policy_base64),
        url = s3Client.getBucketUrl(fileItem.file_s3_bucket),
        body = Object.assign({
          aws_access_key_id: consts.storage_access_key,
          acl,
          success_action_status,
          policy_base64,
          signature,
          url,
        }, fileItem),
        response = httpUtil.toResponse(httpStatus.CREATED, body);
      log.info({
        request_id,
        http_response: response,
      }, 'success - end');
      return callback(null, response);
    })
    .catch(error => {
      const response = httpUtil.toResponse(httpStatus.INTERNAL_SERVER_ERROR);
      log.error({
        request_id,
        error,
        http_response: response,
      }, 'Failed to process file - end');
      return callback(null, response);
    });
};
