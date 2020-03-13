import { gql } from "apollo-server-lambda";

export default gql`
    type Query {
        leagues: [League]
        leaguesByCountries(countries: [String]): [League]
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
