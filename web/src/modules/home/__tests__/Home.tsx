import React from "react";
import { fireEvent, render, screen, wait } from "@testing-library/react";
import { WizardProvider } from "../../../context/WizardContext";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../Home";

describe("Home", () => {
    beforeEach(async () => {
        render(
            <Router>
                <WizardProvider>
                    <Home />
                </WizardProvider>
            </Router>
        );

        await wait();
    });
});
