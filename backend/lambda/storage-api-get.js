// imports
import httpStatus from 'http-status-codes';

// local imports
import { storage_columns } from '../model/consts';
import { createOrderedId } from '../lib/uuid';
import { toResponse, toRedirectResponse } from '../lib/http-util';
import { isNotValid } from '../lib/item-util';
import { loadFile } from '../lib/file-storage';
import { getPresignedUrl } from '../lib/s3-client';

// logging
import { createLogger } from 'bunyan';
const log = createLogger({ name: 'storage-api-get' });

exports.get = (event, context, callback) => {
  const request_id = uuid.createOrderedId();
  log.info({
    request_id,
    event
  }, 'start');
  const file_id = event.pathParameters && event.pathParameters[storage_columns.file_id];
  if (isNotValid(file_id)) {
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
        }, 'success - end');
        return callback(null, response);
      })
      .catch(error => {
        const response = httpUtil.toResponse(httpStatus.INTERNAL_SERVER_ERROR);
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
    const url = getPresignedUrl(file.file_s3_bucket, file.file_s3_key);
    return httpUtil.toRedirectResponse(url);
  } else {
    return httpUtil.toResponse(httpStatus.NOT_FOUND);
  }
}
