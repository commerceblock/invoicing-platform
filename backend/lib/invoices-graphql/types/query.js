import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import ProfileType from '../types/profile';
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
    invoiceSummary: {
      type: InvoiceSummaryType,
      args: {
        linkId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, { linkId }) {
        return db.getInvoiceSummary(linkId);
      },
    }
  }),
});

export default QueryType;
