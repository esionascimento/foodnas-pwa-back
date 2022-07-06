import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from 'graphql';
import { Users } from '../../Entities/Users';
import { UserType } from '../typeDefs/User';
import { MessageType } from '../typeDefs/Message';
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

export const DELETE_USER_ID = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID }
  },
  async resolve(_: any, {id}: any) {
    const result =  await Users.delete(id);

    if (result.affected === 1) return true
    return false
  }
};

export const UPDATE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: {
          name: { type: GraphQLString },
          username: { type: GraphQLString },
          oldPassword: { type: GraphQLString },
          newPassword: { type: GraphQLString }
        }
      })
    }
  },
  async resolve(_: any, {id, input}: any) {
    const resultExist = await Users.findOneBy({id});
    if (!resultExist) return {
      success: false,
      message: 'User not found'
    }

    const isMatch = await bcrypt.compare(input.oldPassword, resultExist.password);
    if (!isMatch) return {
      success: false,
      message: 'Failed to compare old password'
    }

    const newPasswordHash = await bcrypt.hash(input.newPassword, 12);
    const result = await Users.update({id}, {
      name: input.name,
      username: input.username,
      password: newPasswordHash
    });
    if (result.affected === 0) return {
      success: false,
      message: 'User not successfully updated'
    }

    return {
      success: true,
      message: 'Successfully updated'
    }
  }
};
