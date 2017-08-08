// imports
import { sortBy } from 'lodash';

// local imports
import Event from '../model/event';
import { event_columns } from '../model/consts';
import { formatPQN } from './http-util';

// logging
import { createLogger } from 'bunyan';
const log = bunyan.createLogger({ name: 'event-store' });

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
          log.info(`event saved, prn: ${formatPQN(payload)}`);
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
          const sorted_events = sortBy(events, [event_columns.timestamp]);
          resolve(sorted_events);
        }
      });
  });
};
