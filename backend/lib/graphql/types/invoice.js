/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
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
    contractBasePK: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'invoice contract base public key',
    },
    contractEncryptionKey: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'invoice contract encryption key',
    }
  }),
});

export default InvoiceType;
