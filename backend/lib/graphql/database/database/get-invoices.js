// imports
import {
  chain,
  includes,
  isEmpty,
} from 'lodash';

// local imports
import { loadEvents } from '../../../event-store';
import {
  buildInvoice,
  invoice_types,
} from './get-invoice';
import {
  event_type,
  event_columns,
} from '../../../../model/consts';

export default async (traderId, index = 0, count = 10) => loadEvents(traderId)
  .then(events => {
    const invoices = chain(events)
      .filter(event => includes(invoice_types, event.type))
      .groupBy(event => event.data.invoice_id)
      .map((items, key) => buildInvoice(items))
      .filter(invoice => !isEmpty(invoice))
      .drop(index)
      .take(count)
      .value();
    return invoices;
  });
