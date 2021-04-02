import React, { useEffect, useState } from "react";
import Home from "./modules/home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Wizard from "./modules/wizard/Wizard";
import { SET_USER, useUserDispatch, useUserState } from "./context/UserContext";
import { db, firebase } from "./services/Firebase";
import { useWizardDispatch, SET_TEAMS } from "./context/WizardContext";
import { Button, Loading } from "@kiwicom/orbit-components";
import styled from "styled-components";
import Logout from "@kiwicom/orbit-components/lib/icons/Logout";
import Google from "@kiwicom/orbit-components/lib/icons/Google";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useUserState();
    const userDispatch = useUserDispatch();
    const wizardDispatch = useWizardDispatch();

    useEffect(() => {
        function restoreUserSession() {
            firebase.auth().onAuthStateChanged((user) => {
                try {
                    if (user) {
                        const { displayName, email, uid } = user;
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
                                    navigate("/wizard/countries");
                                }
                            })
                            .catch(function (error) {
                                console.log("Error getting document:", error);
                            });
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    setIsLoading(false);
                }
            });
        }

        restoreUserSession();
    }, [userDispatch, wizardDispatch, navigate]);

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
                            navigate("/wizard/countries");
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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <Navbar className="p-3 shadow-md">
                <div className="container mx-auto md:max-w-screen-sm flex flex-row items-center justify-between">
                    <div className="mr-2">
                        <Button
                            onClick={() => navigate("wizard")}
                            type="secondary"
                            // iconLeft={<Calendar />}
                        >
                            Select teams
                        </Button>
                    </div>
                    <Button
                        onClick={user ? onSignOut : onSignUp}
                        type="secondary"
                        iconLeft={user ? <Logout /> : <Google />}
                    >
                        {user ? "Sign Out" : "Sign Up"}
                    </Button>
                </div>
            </Navbar>
            <div className="container mx-auto md:max-w-screen-sm">
                <div className=" mt-20 mx-2 lg:mx-0">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="wizard/*" element={<Wizard />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

const Navbar = styled.div`
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    position: fixed;
    background: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

export default App;
