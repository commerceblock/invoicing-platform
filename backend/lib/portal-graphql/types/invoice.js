/* @flow */

import {
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';

const InvoiceType = new GraphQLObjectType({
  name: 'Invoice',
  description: 'An invoice object',
  fields: () => ({
    invoiceId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The unique identifier of the invoice',
    },
    date: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'invoice creation date (e.g. 30-07-17)',
    },
    externalReferenceId: {
      type: GraphQLString,
      description: 'external reference identifier',
    },
    btcAmount: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'invoice btc amount in satoshis',
    },
    status: {
      type: GraphQLString,
      description: 'invoice status (pending, redeemed)',
    },
    fileIds: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'invoice attached file ids',
    },
    contractId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The unique identifier of the contract',
    },
    contractHash: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'contract sha256 hash',
    },
    contractBasePK: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'contract base public key',
    },
    commitmentPK: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'commitment public key',
    },
    contractEncryptionKey: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'invoice contract encryption key',
    },
    linkId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'invoice public-facing unique identifier',
    }
  }),
});

export default InvoiceType;
