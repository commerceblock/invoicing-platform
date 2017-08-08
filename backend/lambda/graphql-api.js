// imports
import httpStatus from 'http-status-codes';

// local imports
import { createOrderedId} from '../lib/uuid';
import { toResponse } from '../lib/http-util';

const handle = require('./graphql/index').default;

// logging
const bunyan = require('bunyan'),
  log = bunyan.createLogger({
    name: 'graphql'
  });

exports.post = (event, context, callback) => {
  const request_id = uuid.createOrderedId();
  log.info({
    request_id,
    event
  }, 'start');
  const body = JSON.parse(event.body);
  handle(body.query, body.variables)
    .then(result => {
      const response = httpUtil.toResponse(httpStatus.OK, result);
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
      }, 'Failed to process request - end');
      return callback(null, response);
    });
};
