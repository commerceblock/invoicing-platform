/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'A profile object',
  fields: () => ({
    traderId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The unique identifier of the trader',
    },
    rootContractBasePKSignature: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The root contract base public key sha256 signature',
    },
  }),
});

export default ProfileType;
