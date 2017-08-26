
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

export default async (trader_id, invoice_id) => {
  // TODO:: check if there is invoice first.
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
