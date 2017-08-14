/* @flow */

import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const ProfileInputType = new GraphQLInputObjectType({
  name: 'ProfileInput',
  description: 'A profile input object',
  fields: () => ({
    traderId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The unique identifier of the trader',
    },
    rootContractBasePK: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The root contract base public key',
    },
  }),
});

export default ProfileInputType;
