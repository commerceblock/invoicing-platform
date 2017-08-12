/* @flow */

import { GraphQLObjectType } from 'graphql';
import ProfileType from '../types/profile';
import ProfileInputType from '../types/profile-input';
import InvoiceType from '../types/invoice';
import InvoiceInputType from '../types/invoice-input';
import db from '../database';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createProfile: {
      type: ProfileType,
      description: 'Create a new profile',
      args: {
        profile: { type: ProfileInputType }
      },
      resolve: (value, { profile }) => {
        return db.createProfile(profile);
      }
    },
    createInvoice: {
      type: InvoiceType,
      description: 'Create a new invoice',
      args: {
        invoice: { type: InvoiceInputType }
      },
      resolve: (value, { invoice }) => {
        return db.createInvoice(invoice);
      }
    },
    redeemReceipt: {
      type: InvoiceType,
      description: 'Redeem receipt',
      args: {
        receipt: { type: ReceiptInputType }
      },
      resolve: (value, { receipt }) => {
        return db.redeemReceipt(receipt);
      }
    }
  }),
});

// #### Redeem receipt (by invoice id and trader_id) ####
// Request:
// - invoice_id (required) (max length 50)
// - trader_id (required) (max length 100)
// - contract_file_ids - List of contract_file_ids (required)

export default MutationType;
