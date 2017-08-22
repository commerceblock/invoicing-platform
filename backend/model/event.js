
// imports
const dynamoose = require('dynamoose');

// local imports
import { event_columns } from './consts'

// schema defintion
const EventSchema = new dynamoose.Schema({
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
