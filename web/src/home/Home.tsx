import React, { Fragment } from "react";
import { useWizardState } from "../context/WizardContext";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "@kiwicom/orbit-components/lib";
import type { Fixture } from "../../../shared/types";
import FixturesListItem from "./components/FixturesListItem";
import Container from "../common/Container";
import _ from "lodash";
import dayjs from "dayjs";
import BottomFixedButton from "../common/BottomFixedButton";
import styled from "styled-components";
import * as firebase from "firebase";
import {
    SET_USER,
    useUserDispatch,
    useUserState,
} from "../context/UserContext";

const provider = new firebase.auth.GoogleAuthProvider();

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
    const { user } = useUserState();
    const dispatch = useUserDispatch();
    const { loading, error, data } = useQuery(GET_FIXTURES, {
        variables: {
            teamIds: teams!.map((team) => team.id),
        },
    });

    const onSignUp = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                dispatch({
                    type: SET_USER,
                    payload: {
                        // @ts-ignore
                        name: result.additionalUserInfo.profile.given_name,
                    },
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    if (error) {
        return <div>error :(</div>;
    }

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                <FixturesList className="overflow-auto m-2 lg:mx-0 lg:pr-2">
                    {_.map(
                        getFixturesByDate(data.upcomingFixturesByTeamIds),
                        (fixtures, date) => {
                            return (
                                <Fragment key={date}>
                                    <div className="font-bold text-center my-2">
                                        {date}
                                    </div>
                                    {fixtures.map((fixture) => (
                                        <FixturesListItem
                                            key={fixture.id}
                                            fixture={fixture}
                                        />
                                    ))}
                                </Fragment>
                            );
                        }
                    )}
                </FixturesList>
            )}
            <BottomFixedButton
                onClick={onSignUp}
                text={
                    user
                        ? `Hey! ${user.name}`
                        : "Save your teams! sign up with google"
                }
            />
        </Container>
    );
};

const FixturesList = styled.div`
    max-height: calc(100vh - 60px);
`;

export default Home;
