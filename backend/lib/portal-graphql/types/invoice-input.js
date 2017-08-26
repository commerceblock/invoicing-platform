/* @flow */

import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

const InvoiceInputType = new GraphQLInputObjectType({
  name: 'InvoiceInput',
  description: 'An invoice input object',
  fields: () => ({
    contractId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The unique identifier of the contract',
    },
    fileIds: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'invoice attached file ids',
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

export default InvoiceInputType;
