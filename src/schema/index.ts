import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { GREETING } from './Queries/Greeting';
import { CREATE_USER, DELETE_USER_ID } from './Mutations/User';
import { GET_ALL_USER, GET_USER_ID } from './Queries/User';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    greeting: GREETING,
    getAllUsers: GET_ALL_USER,
    getUserId: GET_USER_ID
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUserId: DELETE_USER_ID
  }
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})