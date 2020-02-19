import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./services/ApolloClient";
import { ApolloProvider } from "@apollo/react-hooks";
import { apolloClient } from "./services/ApolloClient";

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);

serviceWorker.unregister();
