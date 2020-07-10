import React, { useEffect, useState } from "react";
import Home from "./modules/home/Home";
import { Routes, Route } from "react-router-dom";
import Wizard from "./modules/wizard/Wizard";
import { SET_USER, useUserDispatch } from "./context/UserContext";
import { db, firebase } from "./services/Firebase";
import { useWizardDispatch, SET_TEAMS } from "./context/WizardContext";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const userDispatch = useUserDispatch();
    const wizardDispatch = useWizardDispatch();

    useEffect(() => {
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
                                console.log("No such document!");
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
    }, [userDispatch, wizardDispatch]);

    if (isLoading) {
        return null
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="wizard/*" element={<Wizard />} />
        </Routes>
    );
};

export default App;
