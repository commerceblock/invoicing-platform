/* @flow */

import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} from 'graphql';

const ReceiptInputType = new GraphQLInputObjectType({
  name: 'ReceiptInput',
  description: 'A receipt input object',
  fields: () => ({
    traderId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The unique identifier of the trader'
    },
    invoiceId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The unique identifier of the invoice'
    },
    receiptFileIds: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'receipt attached file ids'
    }
  }),
});

export default ReceiptInputType;
