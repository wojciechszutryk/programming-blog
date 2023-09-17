import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import models from "./models";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { $server } from "../config";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
  context: {
    models,
  },
});

const alter = true;
const force = false;

models.sequelize.sync({ alter, force }).then(() => {
  apolloServer.listen($server.port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
