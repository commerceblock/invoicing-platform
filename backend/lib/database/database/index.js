import wrapLogger from '../../utils/wrap-logger';
import getInvoice from './get-invoice';
import getInvoices from './get-invoices';
import getFile from './get-file';
import createInvoice from './create-invoice';
import archiveInvoice from './archive-invoice'
import redeemReceipt from './redeem-receipt';
import saveFile from './save-file';
import getInvoiceSummary from './get-invoice-summary'

const database = {
  getInvoice,
  getInvoices,
  getFile,
  createInvoice,
  archiveInvoice,
  redeemReceipt,
  saveFile,
  getInvoiceSummary,
};

export default wrapLogger(database);
