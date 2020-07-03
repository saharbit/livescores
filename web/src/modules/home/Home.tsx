import React from "react";
import { useWizardState } from "../../context/WizardContext";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "@kiwicom/orbit-components/lib";
import type { Fixture } from "../../../../shared/types";
import Container from "../../common/Container";
import _ from "lodash";
import dayjs from "dayjs";
import BottomFixedButton from "../../common/BottomFixedButton";
import * as firebase from "firebase";
import {
    SET_USER,
    useUserDispatch,
    useUserState,
} from "../../context/UserContext";
import FixturesList from "./components/FixturesList";
import { useNavigate } from "react-router-dom";

const GET_FIXTURES = gql`
    query fixturesList($teamIds: [Int]!) {
        upcomingFixturesByTeamIds(teamIds: $teamIds) {
            id
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
            }
        }
    }
`;

const GET_DEFAULT_FIXTURES = gql`
    {
        upcomingFixturesFromTopLeagues {
            id
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
            }
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
    const { loading, error, data } = useQuery(
        !!user ? GET_FIXTURES : GET_DEFAULT_FIXTURES,
        { ...(!!user ? { variables: { teamIds: teams } } : {}) }
    );
    let navigate = useNavigate();

    const onSignUp = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email, uid } = result.user!;

                dispatch({
                    type: SET_USER,
                    payload: {
                        uid,
                        displayName,
                        email,
                    },
                });

                navigate("/wizard");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (error) {
        return <div>error :(</div>;
    }

    const fixtures = !!user
        ? data?.upcomingFixturesByTeamIds
        : data?.upcomingFixturesFromTopLeagues;

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                <FixturesList fixtures={getFixturesByDate(fixtures)} />
            )}
            <BottomFixedButton
                onClick={() => (!!user ? true : onSignUp())}
                text={
                    !!user ? `Hey, ${user.displayName}` : "Set up your own feed"
                }
            />
        </Container>
    );
};

export default Home;
