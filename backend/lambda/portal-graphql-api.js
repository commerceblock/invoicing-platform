// imports
import httpStatus from 'http-status-codes';
import {
  isString,
  isEmpty,
} from 'lodash';

// local imports
import graphQLHandler from '../lib/portal-graphql';
import { createOrderedId } from '../lib/utils/uuid';
import { toResponse } from '../lib/utils/http-util';
import { loadToken } from '../lib/store/access-tokens-store';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'graphql-api' });

const access_token_ttl = 30 * 60 * 1000;

export function post (event, context, callback) {
  const request_id = createOrderedId();
  log.info({ request_id, event }, 'start');
  // authz token
  const headers = event.headers || {};
  const authorizationToken = headers.Authorization || '';
  const token = authorizationToken.split(' ');
  if (token.length !== 2 ||
      token[0] !== 'Bearer' ||
      token[1].length !== 22) {
    const response = toResponse(httpStatus.FORBIDDEN);
    log.error({ request_id, authorizationToken, http_response: response }, 'malformed token - end');
    return callback(null, response);
  }

  // load token
  const accessTokenId = token[1];
  loadToken(accessTokenId)
    .then(accessToken => {
      if (isEmpty(accessToken)) {
        // not found
        const response = toResponse(httpStatus.FORBIDDEN);
        log.error({ request_id, accessTokenId, http_response: response }, 'not found token - end');
        return callback(null, response);
      } else if (isTokenInvalid(accessToken)) {
        // invalid
        const response = toResponse(httpStatus.FORBIDDEN);
        log.error({ request_id, accessTokenId, http_response: response }, 'invalid token - end');
        return callback(null, response);
      } else if (isTokenExpired(accessToken)) {
        // expired
        const response = toResponse(httpStatus.FORBIDDEN);
        log.error({ request_id, accessTokenId, http_response: response }, 'expired token - end');
        return callback(null, response);
      } else {
        // valid token
        const traderId = accessToken.trader_id;
        const context = { traderId };
        const body = JSON.parse(event.body);
        graphQLHandler(body.query, body.variables, context)
          .then(result => {
            const response = toResponse(httpStatus.OK, result);
            log.info({ request_id, http_response: response }, 'success - end');
            return callback(null, response);
          })
          .catch(error => {
            const response = toResponse(httpStatus.INTERNAL_SERVER_ERROR);
            log.error({ request_id, error, http_response: response }, 'Failed to process request - end');
            return callback(null, response);
          });
      }
    });
};

export function isTokenInvalid(accessToken) {
  return isEmpty(accessToken.trader_id);
}

export function isTokenExpired(accessToken) {
  const diffInMills = new Date().getTime() - new Date(accessToken.timestamp).getTime()
  return diffInMills >= access_token_ttl; // 30 min
}
