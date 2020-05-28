import React from "react";
import { useWizardState } from "../context/WizardContext";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "@kiwicom/orbit-components/lib";
import { Fixture } from "../../../shared/types";

export const GET_FIXTURES = gql`
    query fixturesList($teamIds: [Int]!) {
        upcomingFixturesByTeamIds(teamIds: $teamIds) {
            id
            homeTeam {
                name
            }
            awayTeam {
                name
            }
            venue
        }
    }
`;

const Home = () => {
    const { teams } = useWizardState();
    const { loading, error, data } = useQuery(GET_FIXTURES, { variables: { teamIds: [157, 165] } });

    if (error) {
        return <div>error :(</div>;
    }

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    {data.upcomingFixturesByTeamIds.map((fixture: Fixture) => (
                        <>
                            <div>{fixture.id}</div>
                            <div>{fixture.homeTeam.name}</div>
                            <div>{fixture.awayTeam.name}</div>
                            <div>{fixture.venue}</div>
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
