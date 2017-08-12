import wrapLogger from '../../utils/wrapLogger';
import wrapPromise from '../../utils/wrapPromise';

const profile = {
  traderId: 'foo_bar_traderId',
  rootContractBasePKSignature: 'foo_bar_rootContractBasePKSignature'
};

const invoice = {
  invoiceId: 'foo_invoiceId',
  title: 'foo_title',
  fileIds: ['foo_fileId'],
  contractBasePK: 'foo_contractBasePK',
  contractEncryptionKey: 'foo_contractEncryptionKey',
  btcAmount: '1000',
  externalReferenceId: ''
};

const file = {
  fileId: 'foo_fileId',
  fileName: 'foo_fileName',
  fileS3Url: 'https://foo_fileS3Url'
};

const database = {
  getProfile: (_params) => profile,
  getInvoice: (_params) => invoice,
  getInvoices: (_params) => [invoice],
  getInvoiceByLink: (_params) => invoice,
  getFile: (_params) => file
};

export default wrapLogger(wrapPromise(database));
