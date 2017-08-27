/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const FileType = new GraphQLObjectType({
  name: 'File',
  description: 'A file object',
  fields: () => ({
    fileId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The unique Identifier of the file',
    },
    fileName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the file',
    },
    fileHash: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Tje sha256 hash of the file',
    },
    fileS3Url: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'S3 URL of the file',
    },
  }),
});

export default FileType;
