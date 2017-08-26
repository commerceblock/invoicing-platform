/* @flow */

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import InvoiceType from '../types/invoice';
import InvoiceInputType from '../types/invoice-input';
import InvoiceArchivedType from '../types/invoice-archived';
import ReceiptInputType from '../types/receipt-input';
import FileType from '../types/file';
import FileInputType from '../types/file-input';
import db from '../../database';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createInvoice: {
      type: InvoiceType,
      description: 'Create a new invoice',
      args: {
        invoice: { type: InvoiceInputType },
      },
      resolve: (value, { invoice }, context) => db.createInvoice(context.traderId, invoice),
    },
    archiveInvoice: {
      type: InvoiceArchivedType,
      description: 'Create a new invoice',
      args: {
        invoiceId: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The unique identifier of the invoice',
        },
      },
      resolve: (value, { invoiceId }) => db.archiveInvoice(context.traderId, invoiceId),
    },
    redeemReceipt: {
      type: InvoiceType,
      description: 'Redeem receipt',
      args: {
        receipt: { type: ReceiptInputType },
      },
      resolve: (value, { receipt }, context) => db.redeemReceipt(context.traderId, receipt),
    },
    saveFile: {
      type: FileType,
      description: 'Save a file',
      args: {
        file: { type: FileInputType },
      },
      resolve: (value, { file }, context) => db.saveFile(context.traderId, file),
    },
  }),
});

export default MutationType;
