
// local imports
import { saveEvent } from '../../store/events-store';
import {
  event_type,
  invoice_status,
} from '../../../model/consts';
import {
  createId,
  createOrderedId,
} from '../../utils/uuid';

export default async (traderId, invoiceId) => {
  // TODO:: check if there is invoice first.
  const payload = {
    trader_id: traderId,
    event_id: createOrderedId(),
    type: event_type.invoice_archived,
    timestamp: new Date().toISOString(),
    data: {
      invoice_id: invoiceId
    },
  };
  return saveEvent(payload)
    .then(payload => ({
      invoiceId: payload.data.invoice_id,
      status: invoice_status.archived
    }));
};
