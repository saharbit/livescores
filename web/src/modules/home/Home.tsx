import React from "react";
import {
    SET_TEAMS,
    useWizardDispatch,
    useWizardState,
} from "../../context/WizardContext";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "@kiwicom/orbit-components/lib";
import Container from "../../common/Container";
import BottomFixedButton from "../../common/BottomFixedButton";
import {
    SET_USER,
    useUserDispatch,
    useUserState,
} from "../../context/UserContext";
import FixturesList from "./components/FixturesList";
import { useNavigate } from "react-router-dom";
import { db, firebase } from "../../services/Firebase";
import { GET_DEFAULT_FIXTURES, GET_FIXTURES } from "./queries";
import { getFixturesByDate } from "./utils";

const Home = () => {
    const { teams } = useWizardState();
    const { user } = useUserState();
    const userDispatch = useUserDispatch();
    const wizardDispatch = useWizardDispatch();
    const { loading, error, data } = useQuery(
        user && teams?.length ? GET_FIXTURES : GET_DEFAULT_FIXTURES,
        { ...(!!user ? { variables: { teamIds: teams } } : {}) }
    );
    const navigate = useNavigate();

    if (error) {
        return <div>Error :(</div>;
    }

    const fixtures = user
        ? data?.upcomingFixturesByTeamIds
        : data?.upcomingFixturesFromTopLeagues;

    const onSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                userDispatch({ type: SET_USER, payload: null });
                wizardDispatch({ type: SET_TEAMS, payload: [] });
            });
    };

    const onSignUp = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email, uid } = result.user!;
                userDispatch({
                    type: SET_USER,
                    payload: {
                        uid,
                        displayName,
                        email,
                    },
                });
                const userDoc = db.collection("users").doc(uid);
                userDoc
                    .get()
                    .then(function (doc) {
                        if (doc.exists) {
                            wizardDispatch({
                                type: SET_TEAMS,
                                payload: doc.data()?.teams,
                            });
                        } else {
                            console.log("No such document!");
                            navigate("/wizard");
                        }
                    })
                    .catch(function (error) {
                        console.log("Error getting document:", error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                <FixturesList fixtures={getFixturesByDate(fixtures)} />
            )}
            <BottomFixedButton
                onClick={user ? onSignOut : onSignUp}
                text={
                    user
                        ? `Hey, ${user.displayName}. Sign out ->`
                        : "Set up your own feed! ->"
                }
            />
        </Container>
    );
};

export default Home;
