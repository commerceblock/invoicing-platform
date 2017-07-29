'use strict';

// imports
const _ = require('lodash');


const isValid = exports.isValid = (param) => !_.isEmpty(param) && param.length <= 50;

exports.isNotValid = (param) => !isValid(param);

// EFQN: event fully qualified name
exports.formatEventFQN = (event) => `${event.trader_id}/${event.type}/${event.event_id}`;

exports.isEventPredicate = _.conforms({
  type: _.isString
});
