
// imports
import { Schema } from 'dynamoose'

// local imports
import dynamoose from '../lib/clients/dynamoose';
import { columns } from './consts'

// schema defintion
const EventSchema = new Schema({
  [columns.trader_id]: {
    type: String,
    hashKey: true,
  },
  [columns.event_id]: {
    type: String,
    rangeKey: true,
  },
  [columns.type]: {
    type: String,
  },
  [columns.timestamp]: {
    type: String,
  },
  [columns.data]: {
    type: Object,
  },
  [columns.invoice_id]: {
    type: String,
  },
  [columns.link_id]: {
    type: String,
    index: {
      global: true,
      name: 'InvoiceSummaryIndex',
      project: [columns.trader_id, columns.invoice_id]
    }
  }
});

const Event = dynamoose.model('events', EventSchema);
export default Event;
