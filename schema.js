import { gql } from "apollo-server-lambda";

export const schema = gql`
  type Query {
    hello: String!
    leagues: [League]
    countries: [Country]
  }

  type League {
    name: String!
  }
  
  type Country {
    name: String!
    flag: String
  }
`;
