import { gql } from "apollo-server-lambda";

export default gql`
    type Query {
        leagues: [League]
        leaguesByCountry(country: String): [League]
        countries: [Country]
    }

    type League {
        name: String!
        logo: String
    }

    type Country {
        name: String!
        flag: String
    }
`;
