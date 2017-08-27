
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
      contract_hash: invoiceInput.contractHash,
      contract_base_pk: invoiceInput.contractBasePK,
      commitment_pk: invoiceInput.commitmentPK,
      link_id: createId(),
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
      btcAmount: payload.data.btc_amount,
      externalReferenceId: payload.data.external_reference_id,
      contractHash: payload.data.contract_hash,
      contractBasePK: payload.data.contract_base_pk,
      commitmentPK: payload.data.commitment_pk,
      contractEncryptionKey: 'EAGLE_EYE',
      linkId: payload.data.link_id,
    }));
};
