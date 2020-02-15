import { ApolloServer } from "apollo-server-lambda";
import { schema } from "./schema";
import { resolvers } from "./resolvers";

export const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  playground: true,
  introspection: true,
  tracing: true
});
