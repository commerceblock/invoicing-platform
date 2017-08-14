// imports
import {
  chain,
  includes,
  isEmpty,
  find,
} from 'lodash';

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

export function buildInvoice(events) {
  const invoice_created = find(events, {
    type: event_type.invoice_created,
  });
  if (invoice_created) {
    const data = invoice_created.data;
    return {
      invoiceId: data.invoice_id,
      title: data.title,
      fileIds: data.file_ids,
      contractBasePK: data.contract_base_pk,
      contractEncryptionKey: data.contract_encryption_key,
      btcAmount: data.btc_amount,
      externalReferenceId: data.external_reference_id,
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
