/* @flow */

import { GraphQLObjectType } from 'graphql';
import ProfileType from '../types/profile';
import ProfileInputType from '../types/profile-input';
import InvoiceType from '../types/invoice';
import InvoiceInputType from '../types/invoice-input';
import ReceiptInputType from '../types/receipt-input';
import FileType from '../types/file';
import FileInputType from '../types/file-input';
import db from '../database';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createProfile: {
      type: ProfileType,
      description: 'Create a new profile',
      args: {
        profile: { type: ProfileInputType },
      },
      resolve: (value, { profile }) => db.createProfile(profile),
    },
    createInvoice: {
      type: InvoiceType,
      description: 'Create a new invoice',
      args: {
        invoice: { type: InvoiceInputType },
      },
      resolve: (value, { invoice }) => db.createInvoice(invoice),
    },
    redeemReceipt: {
      type: InvoiceType,
      description: 'Redeem receipt',
      args: {
        receipt: { type: ReceiptInputType },
      },
      resolve: (value, { receipt }) => db.redeemReceipt(receipt),
    },
    saveFile: {
      type: FileType,
      description: 'Save a file',
      args: {
        file: { type: FileInputType },
      },
      resolve: (value, { file }) => db.saveFile(file),
    },
  }),
});

export default MutationType;
