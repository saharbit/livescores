import React from 'react'
import { render, screen, waitForElement } from "@testing-library/react";
import CountriesPicker from "./CountriesPicker";
import { apolloClient } from "../services/ApolloClient";
import { ApolloProvider } from "@apollo/react-hooks";

test('expect Israel to be in the document', async () => {
    render(<ApolloProvider client={apolloClient}><CountriesPicker /></ApolloProvider>);
    await waitForElement(() => screen.queryByText("Israel"))
});