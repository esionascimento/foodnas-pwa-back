import { GraphQLString } from 'graphql';
import { Users } from '../../Entities/Users';
import { UserType } from '../typeDefs/User';
import bcrypt from 'bcryptjs';

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_:any, args: any) {
    const { name, username, password } = args;
    
    const encrypt = await bcrypt.hash(password, 12);
    
    const result = await Users.insert({
      name,
      username,
      password: encrypt
    });

    return {...args, id: result.identifiers[0].id, password: encrypt}
  }
}