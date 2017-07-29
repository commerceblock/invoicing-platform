'use strict';

// imports
const _ = require('lodash');

// local imports
const Event = require('../model/event'),
  httpUtil = require('./http-util'),
  event_columns = require('../model/consts').event_columns;

// logging
const bunyan = require('bunyan'),
  log = bunyan.createLogger({
    name: 'event-store'
  });

exports.saveEvent = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      const event = new Event(payload);
      event.save((error) => {
        if (error) {
          log.error({
            error,
            payload
          }, 'failed to save event');
          reject({
            error,
            payload
          });
        } else {
          log.info(`event saved, prn: ${httpUtil.formatPQN(payload)}`);
          resolve(payload);
        }
      });
    } catch (error) {
      log.error({
        error,
        payload
      }, 'an error occurred while saving event');
      reject({
        error,
        payload
      });
    }
  });
};

exports.loadEvents = (trader_id) => {
  return new Promise((resolve, reject) => {
    Event.query(event_columns.trader_id)
      .eq(trader_id)
      .consistent()
      .exec(function(error, events) {
        if (error) {
          reject({
            order_id,
            error
          });
        } else {
          const sorted_events = _.sortBy(events, [event_columns.timestamp]);
          resolve(sorted_events);
        }
      });
  });
};
