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

ReactDOM.render(
    <Router>
        <ApolloProvider client={apolloClient}>
            <WizardProvider>
                <App />
            </WizardProvider>
        </ApolloProvider>
    </Router>,
    document.getElementById("root")
);

serviceWorker.unregister();
