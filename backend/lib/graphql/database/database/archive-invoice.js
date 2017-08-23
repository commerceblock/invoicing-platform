
// local imports
import { saveEvent } from '../../../../lib/event-store';
import { computeSignature } from '../../../../lib/item-util';
import {
  event_type,
  invoice_status,
} from '../../../../model/consts';
import {
  createId,
  createOrderedId,
} from '../../../../lib/uuid';

export default async (trader_id, invoice_id) => {
  const event_id = createOrderedId();
  const payload = {
    trader_id,
    event_id,
    type: event_type.invoice_archived,
    timestamp: new Date().toISOString(),
    data: {
      invoice_id
    },
  };
  return saveEvent(payload)
    .then(payload => ({
      invoiceId: payload.data.invoice_id,
      status: invoice_status.archived
    }));
};
