/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Config from "react-native-config";
import React from "react";

const client = new ApolloClient({
    uri: Config.REACT_APP_GRAPHQL_URI,
    cache: new InMemoryCache(),
});

const AppWithProviders = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => AppWithProviders);
