/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const FileEntryType = new GraphQLObjectType({
  name: 'FileEntry',
  description: 'A file entry object',
  fields: () => ({
    fileName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the file',
    },
    fileUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'URL of the file',
    },
  }),
});

export default FileEntryType;
