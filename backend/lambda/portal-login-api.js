
// imports
import httpStatus from 'http-status-codes';
import { timingSafeEqual } from 'crypto';

// local imports
import {
  columns
} from '../model/consts'
import { toResponse } from '../lib/utils/http-util';
import { createOrderedId, createId } from '../lib/utils/uuid';
import { isNotValid } from '../lib/utils/item-util';
import { loadGenesisEvent } from '../lib/store/events-store'
import { saveToken } from '../lib/store/access-tokens-store';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'portal-login-api' });

export function post(event, context, callback) {
  const request_id = createOrderedId();
  log.info({ request_id, event }, 'start');
  const request = JSON.parse(event.body) || {},
    trader_id = request[columns.trader_id],
    trader_signature = request[columns.trader_signature];

  if (isNotValid(trader_id) || isNotValid(trader_signature)) {
    const response = toResponse(httpStatus.BAD_REQUEST);
    log.warn({ request_id, response }, 'failed to parse request params - end');
    return callback(null, response);
  }

  loadGenesisEvent(trader_id)
    .then(item => {
      if (!item) {
        const response = toResponse(httpStatus.NOT_FOUND);
        log.warn({ request_id, response }, 'failed to locate trader first event - end');
        return callback(null, response);
      } else if (!timingSafeEqual(new Buffer(item.data.trader_signature), new Buffer(trader_signature))) {
        // signature mismatch
        const response = toResponse(httpStatus.NOT_FOUND);
        log.warn({ request_id, response }, 'signature mismatch - end');
        return callback(null, response);
      } else {
        // valid
        const accessToken = {
          access_token_id: createId(),
          trader_id: item.trader_id,
          timestamp: new Date().toISOString(),
        }
        return saveToken(accessToken);
      }
    })
    .catch(error => {
      const response = toResponse(httpStatus.INTERNAL_SERVER_ERROR);
      log.error({ request_id, error, http_response: response }, 'failed to load token - end');
      callback(null, response);
    })
    .then(accessToken => {
      if (accessToken) {
        // TODO:: complete
        const body = { access_token_id: accessToken.access_token_id };
        const response = toResponse(httpStatus.CREATED, body);
        log.info({ request_id, http_response: response }, 'success - end');
        return callback(null, response);
      }
    })
    .catch(error => {
      const response = toResponse(httpStatus.INTERNAL_SERVER_ERROR);
      log.error({ request_id, error, http_response: response }, 'failed to process request - end');
      return callback(null, response);
    });
};
