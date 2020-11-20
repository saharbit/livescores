import { gql } from "@apollo/client";

let fixture = `id
            homeTeam {
                id
                name
                logo
            }
            awayTeam {
                id
                name
                logo
            }
            venue
            date
            league {
                id
                name
                logo
            }`;

export const GET_FIXTURES = gql`
    query fixturesList($teamIds: [Int]!) {
        upcomingFixturesByTeamIds(teamIds: $teamIds) {
            ${fixture}
        }
    }
`;

export const GET_DEFAULT_FIXTURES = gql`
    {
        upcomingFixturesFromTopLeagues {
            ${fixture}
        }
    }
`;
