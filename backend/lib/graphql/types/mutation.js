/* @flow */

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import ProfileType from '../types/profile';
import ProfileInputType from '../types/profile-input';
import InvoiceType from '../types/invoice';
import InvoiceInputType from '../types/invoice-input';
import InvoiceArchivedType from '../types/invoice-archived';
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
    archiveInvoice: {
      type: InvoiceArchivedType,
      description: 'Create a new invoice',
      args: {
        traderId: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The unique identifier of the trader',
        },
        invoiceId: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The unique identifier of the invoice',
        },
      },
      resolve: (value, { traderId, invoiceId }) => db.archiveInvoice(traderId, invoiceId),
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
