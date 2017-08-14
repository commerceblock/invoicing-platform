// imports
import { findLast } from 'lodash';

// local imports
import { loadEvents } from '../../../event-store';
import {
  event_type,
  event_columns,
} from '../../../../model/consts';

export default async (traderId) => loadEvents(traderId)
  .then(events => {
    const profile_created = findLast(events, {
      type: event_type.profile_created,
    });
    if (profile_created) {
      return {
        traderId: profile_created[event_columns.data][event_columns.trader_id],
        rootContractBasePKSignature: profile_created[event_columns.data][event_columns.root_contract_base_pk_signature],
      };
    }
    // TODO: revisit errors
    return {};
  });
