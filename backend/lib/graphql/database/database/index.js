import wrapLogger from '../../utils/wrap-logger';
import getProfile from './get-profile';
import getInvoice from './get-invoice';
import getInvoices from './get-invoices';
import getInvoiceByLink from './get-invoice-by-link';
import getFile from './get-file';
import createProfile from './create-profile';
import createInvoice from './create-invoice';
import redeemReceipt from './redeem-receipt';

const database = {
  getProfile,
  getInvoice,
  getInvoices,
  getInvoiceByLink,
  getFile,
  createProfile,
  createInvoice,
  redeemReceipt
};

export default wrapLogger(database);
