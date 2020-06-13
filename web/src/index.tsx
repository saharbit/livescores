import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./services/ApolloClient";
import { ApolloProvider } from "@apollo/react-hooks";
import { apolloClient } from "./services/ApolloClient";
import { WizardProvider } from "./context/WizardContext";
import { BrowserRouter as Router } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserProvider } from "./context/UserContext";

const firebaseConfig = {
    apiKey: "AIzaSyAr94Nrx6dmX97I-YoS6qmpWiOAgfoUXZM",
    authDomain: "livescores-43042.firebaseapp.com",
    databaseURL: "https://livescores-43042.firebaseio.com",
    projectId: "livescores-43042",
    storageBucket: "livescores-43042.appspot.com",
    messagingSenderId: "1009741899248",
    appId: "1:1009741899248:web:74fca234ffc9c2216e6935",
    measurementId: "G-K02FFS825B",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Router>
        <ApolloProvider client={apolloClient}>
            <WizardProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </WizardProvider>
        </ApolloProvider>
    </Router>,
    document.getElementById("root")
);

serviceWorker.unregister();
