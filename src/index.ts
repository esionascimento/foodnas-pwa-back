import "reflect-metadata";
import path from 'path';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { UserResolver } from "./resolvers/UserResolver";
import { AppDataSource } from "./data-source";
import { schema } from './schema';

async function main() {
  AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
  // const schema = await buildSchema({
  //   resolvers: [UserResolver],
  //   emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  // })

  const server = new ApolloServer({
    schema
  })

  const { url } = await server.listen();

  console.log(`Server running on ${url}`);
}

main();
