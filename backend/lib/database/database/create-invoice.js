
// local imports
import { saveEvent } from '../../store/events-store';
import { event_type } from '../../../model/consts';
import {
  createId,
  createOrderedId,
} from '../../../lib/utils/uuid';

export default async (traderId, invoiceInput) => {
  const trader_id = traderId;
  const event_id = createOrderedId();
  const payload = {
    trader_id,
    event_id,
    type: event_type.invoice_created,
    timestamp: new Date().toISOString(),
    data: {
      invoice_id: createId(),
      contract_id: invoiceInput.contractId,
      file_ids: invoiceInput.fileIds,
      btc_amount: invoiceInput.btcAmount,
      external_reference_id: invoiceInput.externalReferenceId,
    },
  };
  // TODO:: complete
  // contractBasePK
  // contractEncryptionKey
  return saveEvent(payload)
    .then(payload => ({
      invoiceId: payload.data.invoice_id,
      fileIds: payload.data.file_ids,
      contractId: payload.contract_id,
      contractBasePK: 'FOO_FIGHTER',
      contractEncryptionKey: 'EAGLE_EYE',
      btcAmount: payload.data.btc_amount,
      externalReferenceId: payload.data.external_reference_id,
    }));
};
