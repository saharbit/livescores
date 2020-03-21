import { gql } from "apollo-server-lambda";

export default gql`
    type Query {
        countries: [Country]
        leaguesByCountryNames(countryNames: [String]): [League]
        teamsByLeagueIds(leagueIds: [Int]): [Team]
    }

    type Country {
        name: String!
        flag: String
    }

    type League {
        id: Int!
        name: String!
        logo: String
    }

    type Team {
        id: Int!
        name: String!
        logo: String
    }
`;
