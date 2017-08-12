import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import ProfileType from '../types/profile';
import InvoiceType from '../types/invoice';
import FileType from '../types/file';
import db from '../database';

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    profile: {
      type: ProfileType,
      args: {
        traderId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, {traderId}) {
        return db.getProfile(traderId);
      }
    },
    invoice: {
      type: InvoiceType,
      args: {
        traderId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        invoiceId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, {traderId, invoiceId}) {
        return db.getInvoice(traderId, invoiceId);
      }
    },
    invoices: {
      type: new GraphQLList(InvoiceType),
      args: {
        traderId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        index: {
          type: GraphQLString
        },
        count:{
          type: GraphQLInt
        }
      },
      resolve(parent, {traderId, index, count}) {
        return db.getInvoices(traderId, index, count);
      }
    },
    invoiceByLink: {
      type: InvoiceType,
      args: {
        linkId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, {linkId}) {
        return db.getInvoiceByLink(linkId);
      }
    },
    file: {
      type: FileType,
      args: {
        fileId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, {fileId}) {
        return db.getFile(fileId);
      }
    }
  }),
});

export default QueryType;
