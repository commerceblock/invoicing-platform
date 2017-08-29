
// imports
import {
  map,
  find
} from 'lodash'

// local imports
import { event_type } from '../../../model/consts';
import { formatDate } from './get-invoice';
import { loadInvoiceEventsByLinkId } from '../../store/events-store';
import { loadFile } from '../../store/files-store'
import { generateSignedGetUrl } from '../../clients/s3-client';

export default async (linkId) => {
  return loadInvoiceEventsByLinkId(linkId)
    .then(events => {
      if (events) {
        const invoice_created = find(events, {
          type: event_type.invoice_created,
        });
        if (invoice_created) {
          const data = invoice_created.data;
          const base = {
            invoiceId: data.invoice_id,
            linkId: data.link_id,
            date: formatDate(invoice_created.timestamp),
            btcAmount: data.btc_amount,
            contractBasePK: data.contract_base_pk,
            contractEncryptionKey: data.contract_encryption_key,
            payeeCommitmentPK: data.payee_commitment_pk,
          };
          return Promise.all(map(data.file_ids, id => loadFile(id)))
            .then(results => {
              const fileRecords = map(results, file => ({
                fileName: file.file_name,
                fileUrl: generateSignedGetUrl(file.file_s3_bucket, file.file_s3_key)
              }));
              return Object.assign({}, base, { files: fileRecords });
            });
        }
      }
      return null;
    });
}
