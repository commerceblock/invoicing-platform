/* @flow */

import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} from 'graphql';

const ReceiptInputType = new GraphQLInputObjectType({
  name: 'ReceiptInput',
  description: 'A receipt input object',
  fields: () => ({
    invoiceId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The unique identifier of the invoice',
    },
    receiptFileIds: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'receipt attached file ids',
    },
  }),
});

export default ReceiptInputType;
