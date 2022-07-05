import { GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  }
})
