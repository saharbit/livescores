import React from "react";
import { useWizardState } from "../context/WizardContext";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "@kiwicom/orbit-components/lib";
import { Fixture } from "../../../shared/types";
import FixturesListItem from "./FixturesListItem";
import Container from "../common/Container";
import _ from "lodash";
import dayjs from "dayjs";

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

function getFixturesByDate(fixtures: Fixture[]) {
    return _.groupBy(fixtures, (fixture: Fixture) =>
        dayjs(fixture.date).format("DD/MM/YYYY")
    );
}

const Home = () => {
    const { teams } = useWizardState();
    const { loading, error, data } = useQuery(GET_FIXTURES, {
        variables: {
            teamIds: teams!.map((team) => team.id),
        },
    });

    if (error) {
        return <div>error :(</div>;
    }

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                _.map(
                    getFixturesByDate(data.upcomingFixturesByTeamIds),
                    (fixtures, date) => {
                        return (
                            <>
                                <div className="font-bold">{date}</div>
                                {fixtures.map((fixture) => (
                                    <FixturesListItem
                                        key={fixture.id}
                                        fixture={fixture}
                                    />
                                ))}
                            </>
                        );
                    }
                )
            )}
        </Container>
    );
};

export default Home;
