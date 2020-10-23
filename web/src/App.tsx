import React, { useEffect, useState } from "react";
import Home from "./modules/home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Wizard from "./modules/wizard/Wizard";
import { SET_USER, useUserDispatch } from "./context/UserContext";
import { db, firebase } from "./services/Firebase";
import { useWizardDispatch, SET_TEAMS } from "./context/WizardContext";
import { Loading } from "@kiwicom/orbit-components";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const userDispatch = useUserDispatch();
    const wizardDispatch = useWizardDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        function tryToRestoreUserSession() {
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

        tryToRestoreUserSession();
    }, [userDispatch, wizardDispatch, navigate]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="wizard/*" element={<Wizard />} />
        </Routes>
    );
};

export default App;
