'use strict';

// imports
const httpStatus = require('http-status-codes');

// local imports
const uuid = require('../lib/uuid'),
  httpUtil = require('../lib/http-util'),
  handle = require('../lib/graphql/index').default;

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
