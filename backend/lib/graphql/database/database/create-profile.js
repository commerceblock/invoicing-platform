
// local imports
import { saveEvent } from '../../../../lib/event-store';
import { createOrderedId } from '../../../../lib/uuid';
import { event_type } from '../../../../model/consts';
import { computeSignature } from '../../../../lib/item-util';

export default async (profileInput) => {
  const trader_id = profileInput.traderId;
  const event_id = createOrderedId();
  const root_contract_base_pk = profileInput.rootContractBasePK;
  const root_contract_base_pk_signature = computeSignature(trader_id, event_id, root_contract_base_pk);
  const payload = {
    trader_id,
    event_id,
    type: event_type.profile_created,
    timestamp: new Date().toISOString(),
    data: {
      root_contract_base_pk,
      root_contract_base_pk_signature,
    },
  };
  return saveEvent(payload)
    .then(payload => ({
      traderId: trader_id,
      rootContractBasePKSignature: root_contract_base_pk_signature,
    }));
};
