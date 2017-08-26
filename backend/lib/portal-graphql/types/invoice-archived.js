/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';


const InvoiceArchivedType = new GraphQLObjectType({
  name: 'InvoiceArchived',
  description: 'Invoice archived object',
  fields: () => ({
    invoiceId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The unique identifier of the invoice',
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'invoice status (archived)',
    },
  }),
});

export default InvoiceArchivedType;
