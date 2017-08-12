/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'A profile object',
  fields: () => ({
    traderId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The unique identifier of the trader',
    },
    rootContractBasePKSignature: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The root contract base public key',
    }
  }),
});

export default ProfileType;
