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
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the invoice',
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
    },
    btcAmount: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'invoice btc amount in satoshis',
    },
    externalReferenceId: {
      type: GraphQLString,
      description: 'external reference identifier',
    },
  }),
});

export default InvoiceType;
