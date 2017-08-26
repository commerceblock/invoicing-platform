import wrapLogger from '../../utils/wrap-logger';
import wrapPromise from '../../utils/wrap-promise';

const invoice = {
  invoiceId: 'foo_invoiceId',
  fileIds: ['foo_fileId'],
  contractId: 124,
  contractBasePK: 'foo_contractBasePK',
  contractEncryptionKey: 'foo_contractEncryptionKey',
  btcAmount: '1000',
  externalReferenceId: '',
};

const file = {
  fileId: 'foo_fileId',
  fileName: 'foo_fileName',
  fileS3Url: 'https://foo_fileS3Url',
};

const database = {
  getInvoice: (traderId, invoiceId) => invoice,
  getInvoices: (traderId, index, count) => [invoice],
  getFile: (fileId) => file,
  getInvoiceSummary: (linkId) => { throw new Error('not implemented'); },
  createInvoice: (invoice) => { throw new Error('not implemented'); },
  redeemReceipt: (receipt) => { throw new Error('not implemented'); },
  saveFile: (file) => { throw new Error('not implemented'); },
  archiveInvoice: (traderId, invoiceId) => { throw new Error('not implemented'); },
};

export default wrapLogger(wrapPromise(database));
