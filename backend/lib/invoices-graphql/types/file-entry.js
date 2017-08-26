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
    fileS3Url: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'S3 URL of the file',
    },
  }),
});

export default FileEntryType;
