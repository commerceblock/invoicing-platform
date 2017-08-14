

// imports
import httpStatus from 'http-status-codes';
import { map, filter } from 'lodash';

// local imports
import { event_columns } from '../model/consts';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'http-util' });

const DEFAULT_CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

exports.toResponse = (status, body) => {
  body = body || {};
  return {
    statusCode: status,
    headers: DEFAULT_CORS_HEADERS,
    body: JSON.stringify(body),
  };
};

exports.toRedirectResponse = (url) => {
  const headers = Object.assign({
    Location: url,
  }, DEFAULT_CORS_HEADERS);
  return {
    statusCode: httpStatus.MOVED_TEMPORARILY,
    headers,
  };
};

exports.parseExtension = (fname) => {
  const ext = fname.slice((fname.lastIndexOf('.') - 1 >>> 0) + 2) || '';
  return ext.toLowerCase();
};

exports.resolveMimeType = (extension) => {
  switch (extension) {
    case 'png':
      return 'image/png';
    case 'jpeg':
    case 'jpg':
    case 'jpe':
      return 'image/jpeg';
    case 'gif':
      return 'image/gif';
    case 'htm':
      return 'text/html';
    case 'html':
      return 'text/html';
    default:
      return 'application/octet-stream';
  }
};

exports.parseEvent = (event) => {
  const records = event.Records ? event.Records : [];
  const events = map(records, record => {
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
        data,
      };
    } catch (err) {
      log.error({
        record,
        err,
      }, 'Failed to prase record');
      return {};
    }
  });
  return filter(events, eventUtil.isEventPredicate);
};

exports.executePromises = (promise, request_logger, callback) => promise
  .then(results => {
    const msg = `Finished processing ${results.length} events`;
    request_logger.info(msg);
    // TODO: revisit flow, we might need further processing...
    callback(null, {
      result: {
        message: msg,
      },
    });
  })
  .catch(error => {
    request_logger.error({
      error,
    }, 'Failed to process events');
    // TODO: revisit flow, we might need further processing...
    callback(null, {
      error: {
        message: 'Failed to process events',
        error,
      },
    });
  });
