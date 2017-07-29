'use strict';

// imports
const _ = require('lodash');

// local imports
const eventUtil = require('./event-util'),
  event_columns = require('../model/consts').event_columns;

// logging
const bunyan = require('bunyan'),
  log = bunyan.createLogger({
    name: 'http-util'
  });

exports.toResponse = (status, body) => {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  }
};

exports.parseEvent = (event) => {
  const records = event.Records ? event.Records : [];
  const events = _.map(records, record => {
    try {
      const newImage = record.dynamodb.NewImage,
        trader_id = newImage[event_columns.trader_id].S,
        event_id = newImage[event_columns.event_id].S,
        type = newImage[event_columns.type].S,
        timestamp = newImage[event_columns.timestamp].S,
        data = newImage[event_columns.data].S ? JSON.parse(newImage[event_columns.data].S) : {};
      return {
        trader_id,
        event_id,
        type,
        timestamp,
        data
      };
    } catch (err) {
      log.error({
        record,
        err
      }, 'Failed to prase record');
      return {};
    }
  });
  return _.filter(events, eventUtil.isEventPredicate);
};

exports.executePromises = (promise, request_logger, callback) => {
  return promise
    .then(results => {
      const msg = `Finished processing ${results.length} events`;
      request_logger.info(msg);
      //TODO: revisit flow, we might need further processing...
      callback(null, {
        result: {
          message: msg
        }
      });
    })
    .catch(error => {
      request_logger.error({
        error
      }, 'Failed to process events');
      //TODO: revisit flow, we might need further processing...
      callback(null, {
        error: {
          message: 'Failed to process events',
          error
        }
      });
    });
};
