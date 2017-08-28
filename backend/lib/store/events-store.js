
// imports
import {
  sortBy,
  first
} from 'lodash';

// local imports
import Event from '../../model/event';
import { columns } from '../../model/consts';
import { formatEventFQN } from '../utils/item-util';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'events-store' });

export function saveEvent(payload) {
  return new Promise((resolve, reject) => {
    try {
      const event = new Event(payload);
      event.save((error) => {
        if (error) {
          log.error({
            error,
            payload,
          }, 'failed to save event');
          reject({
            error,
            payload,
          });
        } else {
          log.info(`event saved, prn: ${formatEventFQN(payload)}`);
          resolve(payload);
        }
      });
    } catch (error) {
      log.error({
        error,
        payload,
      }, 'an error occurred while saving event');
      reject({
        error,
        payload,
      });
    }
  });
}

export function loadEvents(trader_id) {
  return new Promise((resolve, reject) => {
    Event.query(columns.trader_id)
      .eq(trader_id)
      .consistent()
      .exec((error, events) => {
        if (error) {
          reject({
            order_id,
            error,
          });
        } else {
          const sorted_events = sortBy(events, [columns.timestamp]);
          resolve(sorted_events);
        }
      });
  });
}

export function loadGenesisEvent(trader_id) {
  return new Promise((resolve, reject) => {
    Event.query(columns.trader_id)
      .eq(trader_id)
      .consistent()
      .ascending()
      .limit(1)
      .exec((error, events) => {
        if (error) {
          reject({
            order_id,
            error,
          });
        } else {
          const firstEvent = first(events);
          resolve(firstEvent);
        }
      });
  });
}
