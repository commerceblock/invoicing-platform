
// imports
import httpStatus from 'http-status-codes';
import { timingSafeEqual } from 'crypto';

// local imports
import {
  columns,
  event_type
} from '../model/consts';
import {
  saveEvent,
  loadGenesisEvent
} from '../lib/store/events-store';
import { toResponse } from '../lib/utils/http-util';
import { createOrderedId, createId } from '../lib/utils/uuid';
import { isNotValid } from '../lib/utils/item-util';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'portal-signup-api' });

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
      if (item) {
        const response = toResponse(httpStatus.CONFLICT);
        log.warn({ request_id, response }, 'trader id already registered - end');
        return callback(null, response);
      } else {
        // new account
        const payload = {
          trader_id,
          event_id: createOrderedId(),
          type: event_type.account_created,
          timestamp: new Date().toISOString(),
          data: {
            trader_signature,
          },
        };
        return saveEvent(payload);
      }
    })
    .then(account_created => {
      if (account_created) {
        const body = { trader_id };
        const response = toResponse(httpStatus.CREATED, body);
        log.info({ request_id, http_response: response }, 'success - end');
        return callback(null, response);
      } else {
        const response = toResponse(httpStatus.INTERNAL_SERVER_ERROR);
        log.error({ request_id, result, http_response: response }, 'failed to save event - end');
        return callback(null, response);
      }
    })
    .catch(error => {
      const response = toResponse(httpStatus.INTERNAL_SERVER_ERROR);
      log.error({ request_id, error, http_response: response }, 'failed to process request - end');
      return callback(null, response);
    });
};
