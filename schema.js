import { gql } from "apollo-server-lambda";

export const schema = gql`
  type Query {
    hello: String!
    leagues: [League]
  }

  type League {
    name: String!
  }
`;
