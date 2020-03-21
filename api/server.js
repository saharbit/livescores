import { ApolloServer } from "apollo-server-lambda";
import schema from "./schema";
import { resolvers } from "./resolvers";
import FootballService from "../services/FootballService";

export const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    formatError: error => {
        return error;
    },
    formatResponse: response => {
        return response;
    },
    context: ({ event, context }) => {
        const footballService = new FootballService();
        return {
            headers: event.headers,
            functionName: context.functionName,
            event,
            context: {
                ...context,
                footballService
            }
        };
    },
    playground: true,
    introspection: true,
    tracing: true
});
