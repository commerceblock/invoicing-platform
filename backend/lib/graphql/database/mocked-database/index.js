import wrapLogger from '../../utils/wrap-logger';
import wrapPromise from '../../utils/wrap-promise';

const profile = {
  traderId: 'foo_bar_traderId',
  rootContractBasePKSignature: 'foo_bar_rootContractBasePKSignature',
};

const invoice = {
  invoiceId: 'foo_invoiceId',
  title: 'foo_title',
  fileIds: ['foo_fileId'],
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
  getProfile: (traderId) => profile,
  getInvoice: (traderId, invoiceId) => invoice,
  getInvoices: (traderId, index, count) => [invoice],
  getInvoiceByLink: (linkId) => invoice,
  getFile: (fileId) => file,
  createProfile: (profile) => { throw new Error('not implemented'); },
  createInvoice: (invoice) => { throw new Error('not implemented'); },
  redeemReceipt: (receipt) => { throw new Error('not implemented'); },
  createFile: (file) => { throw new Error('not implemented'); },
};

export default wrapLogger(wrapPromise(database));
