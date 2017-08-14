

// imports
const dynamoose = require('../lib/dynamoose'),
  Schema = dynamoose.Schema;

// local imports
const consts = require('./consts'),
  event_columns = consts.event_columns;

// schema defintion
const EventSchema = new Schema({
  [event_columns.trader_id]: {
    type: String,
    hashKey: true,
  },
  [event_columns.event_id]: {
    type: String,
    rangeKey: true,
  },
  [event_columns.type]: {
    type: String,
  },
  [event_columns.timestamp]: {
    type: String,
  },
  [event_columns.data]: {
    type: Object,
  },
});

const Event = dynamoose.model('events', EventSchema);
export default Event;
