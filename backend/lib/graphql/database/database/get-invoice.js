// imports
import {
  chain,
  includes,
  isEmpty,
  find,
} from 'lodash';
import moment from 'moment';

// local imports
import { loadEvents } from '../../../event-store';
import {
  event_type,
  event_columns,
} from '../../../../model/consts';

export const invoice_types = [
  event_type.invoice_created,
  event_type.receipt_redeemed,
  event_type.invoice_link_generated,
];

export function formatDate(timestamp) {
  return moment(timestamp).format('DD-MM-YY')
}

export function buildInvoice(events) {
  const invoice_created = find(events, {
    type: event_type.invoice_created,
  });

  if (invoice_created) {
    const receipt_redeemed = find(events, {
      type: event_type.receipt_redeemed,
    });
    const status = receipt_redeemed === undefined ? 'pending': 'redeemed';
    const data = invoice_created.data;
    return {
      invoiceId: data.invoice_id,
      date: formatDate(invoice_created.timestamp),
      externalReferenceId: data.external_reference_id,
      btcAmount: data.btc_amount,
      status,
      fileIds: data.file_ids,
      contractBasePK: data.contract_base_pk,
      contractEncryptionKey: data.contract_encryption_key
    };
  }
  // TODO:: revisit, maybe option instead
  return null;
}

export default async (traderId, invoiceId) => loadEvents(traderId)
  .then(events => {
    const invoiceEvents = chain(events)
      .filter(event => event.data.invoice_id === invoiceId)
      .filter(event => includes(invoice_types, event.type));
    return buildInvoice(invoiceEvents);
  });
