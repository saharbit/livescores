import { gql } from "apollo-server-lambda";

export default gql`
    type Query {
        leagues(country: String): [League]
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
