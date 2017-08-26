// imports
import httpStatus from 'http-status-codes';

// local imports
import graphQLHandler from '../lib/invoices-graphql';
import { createOrderedId } from '../lib/utils/uuid';
import { toResponse } from '../lib/utils/http-util';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'invoices-graphql-api' });

export function post(event, context, callback) {
  const request_id = createOrderedId();
  log.info({
    request_id,
    event,
  }, 'start');
  const body = JSON.parse(event.body);
  graphQLHandler(body.query, body.variables)
    .then(result => {
      const response = toResponse(httpStatus.OK, result);
      log.info({
        request_id,
        http_response: response,
      }, 'success - end');
      return callback(null, response);
    })
    .catch(error => {
      const response = toResponse(httpStatus.INTERNAL_SERVER_ERROR);
      log.error({
        request_id,
        error,
        http_response: response,
      }, 'Failed to process request - end');
      return callback(null, response);
    });
}
