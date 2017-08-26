import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import InvoiceType from '../types/invoice';
import FileType from '../types/file';
import db from '../../database';

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    invoice: {
      type: InvoiceType,
      args: {
        invoiceId: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, { invoiceId }, context) {
        return db.getInvoice(context.traderId, invoiceId);
      },
    },
    invoices: {
      type: new GraphQLList(InvoiceType),
      args: {
        index: {
          type: GraphQLString,
        },
        count: {
          type: GraphQLInt,
        },
      },
      resolve(parent, { index, count }, context) {
        return db.getInvoices(context.traderId, index, count);
      },
    },
    file: {
      type: FileType,
      args: {
        fileId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, { fileId }) {
        return db.getFile(fileId);
      },
    },
  }),
});

export default QueryType;
