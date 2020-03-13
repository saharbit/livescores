import React from "react";
import { fireEvent, render, screen, wait } from "@testing-library/react";
import CountriesPicker, { GET_COUNTRIES } from "./CountriesPicker";
import { WizardProvider } from "./WizardContext";
import { MockedProvider } from "@apollo/react-testing";
import { BrowserRouter as Router } from "react-router-dom";

const mocks = [
    {
        request: {
            query: GET_COUNTRIES
        },
        result: {
            data: {
                countries: [
                    { name: "Israel", flag: "http://i.imgur.com/sGqbBgH.png" },
                    { name: "England", flag: "http://i.imgur.com/sGqbBgH.png" }
                ]
            }
        }
    }
];

describe("Countries Picker", () => {
    beforeEach(async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <WizardProvider>
                    <Router>
                        <CountriesPicker />
                    </Router>
                </WizardProvider>
            </MockedProvider>
        );

        await wait();
    });

    test("should be able to search for a country", async () => {
        let countryInput = await screen.getByPlaceholderText("Country");
        let searchString = "isr";
        fireEvent.change(countryInput, {
            target: { value: searchString }
        });
        expect(screen.getByText("Israel")).toBeInTheDocument();
    });
});
