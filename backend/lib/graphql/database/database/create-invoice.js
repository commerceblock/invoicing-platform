
// local imports
import { saveEvent } from '../../../../lib/event-store';
import { event_type } from '../../../../model/consts';
import { computeSignature } from '../../../../lib/item-util';
import {
  createId,
  createOrderedId,
} from '../../../../lib/uuid';

export default async (invoiceInput) => {
  const trader_id = invoiceInput.traderId;
  const event_id = createOrderedId();
  const payload = {
    trader_id,
    event_id,
    type: event_type.invoice_created,
    timestamp: new Date().toISOString(),
    data: {
      invoice_id: createId(),
      contract_number: invoiceInput.contractNumber,
      file_ids: invoiceInput.fileIds,
      title: invoiceInput.title,
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
      title: payload.data.title,
      fileIds: payload.data.file_ids,
      contractBasePK: 'FOO_FIGHTER',
      contractEncryptionKey: 'EAGLE_EYE',
      btcAmount: payload.data.btc_amount,
      externalReferenceId: payload.data.external_reference_id,
    }));
};
