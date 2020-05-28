import React from "react";
import { useWizardState } from "../context/WizardContext";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "@kiwicom/orbit-components/lib";
import { Fixture } from "../../../shared/types";
import FixtureItem from "./FixtureItem";
import Container from "../common/Container";

export const GET_FIXTURES = gql`
    query fixturesList($teamIds: [Int]!) {
        upcomingFixturesByTeamIds(teamIds: $teamIds) {
            id
            homeTeam {
                name
                logo
            }
            awayTeam {
                name
                logo
            }
            venue
            date
        }
    }
`;

const Home = () => {
    const { teams } = useWizardState();
    const { loading, error, data } = useQuery(GET_FIXTURES, {
        variables: { teamIds: teams!.map((team) => team.id) },
    });

    if (error) {
        return <div>error :(</div>;
    }

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                data.upcomingFixturesByTeamIds.map((fixture: Fixture) => (
                    <FixtureItem key={fixture.id} fixture={fixture} />
                ))
            )}
        </Container>
    );
};

export default Home;
