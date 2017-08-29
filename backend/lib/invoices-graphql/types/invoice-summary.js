/* @flow */

import {
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';

import FileEntryType from './file-entry';

const InvoiceSummaryType = new GraphQLObjectType({
  name: 'InvoiceSummary',
  description: 'An invoice object',
  fields: () => ({
    invoiceId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The unique identifier of the invoice',
    },
    linkId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'invoice shareable link identifier',
    },
    date: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'invoice creation date (e.g. 30-07-17)',
    },
    btcAmount: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'invoice btc amount in satoshis',
    },
    files: {
      type: new GraphQLNonNull(new GraphQLList(FileEntryType)),
      description: 'invoice attached files',
    },
    contractBasePK: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'invoice contract base public key',
    },
    payeeCommitmentPK: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'payee contract commitment public key',
    },
  }),
});

export default InvoiceSummaryType;
