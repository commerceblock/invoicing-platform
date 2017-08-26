/* @flow */

import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

const FileInputType = new GraphQLInputObjectType({
  name: 'FileInput',
  description: 'A file input object',
  fields: () => ({
    fileName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the file',
    },
    fileType: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The type of the file',
    }
  }),
});

export default FileInputType;
