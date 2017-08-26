// imports
import {
  chain,
  includes,
  isEmpty,
} from 'lodash';

// local imports
import { loadEvents } from '../../store/events-store';
import {
  buildInvoice,
} from './get-invoice';
import {
  event_type,
  columns,
  invoice_status,
} from '../../../model/consts';

export default async (traderId, index = 0, count = 10) => loadEvents(traderId)
  .then(events => {
    const invoices = chain(events)
      .filter(event => !isEmpty(event.data.invoice_id))
      .groupBy(event => event.data.invoice_id)
      .map((items, key) => buildInvoice(items))
      .filter(invoice => !isEmpty(invoice) && invoice.status !== invoice_status.archived)
      .drop(index)
      .take(count)
      .value();
    return invoices;
  });
