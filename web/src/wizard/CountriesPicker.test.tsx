import React from "react";
import { render, screen, waitForElement } from "@testing-library/react";
import CountriesPicker from "./CountriesPicker";
import { apolloClient } from "../services/ApolloClient";
import { ApolloProvider } from "@apollo/react-hooks";

describe("Countries Picker", () => {
    beforeEach(() => {
        render(
            <ApolloProvider client={apolloClient}>
                <CountriesPicker />
            </ApolloProvider>
        );
    });

    test("expect Israel to be in the document", async () => {
        await waitForElement(() => screen.queryByText("Israel"));
    });

    test("should be able to select a country", () => {});
});
