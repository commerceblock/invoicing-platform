'use strict';

// imports
import { isEmpty, conforms, isString } from 'lodash';

const isValid = exports.isValid = (param) => !isEmpty(param) && param.length <= 300;

exports.isNotValid = (param) => !isValid(param);

// EFQN: event fully qualified name
exports.formatEventFQN = (event) => `${event.trader_id}/${event.type}/${event.event_id}`;

exports.isEventPredicate = conforms({
  type: isString
});
