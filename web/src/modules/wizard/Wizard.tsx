import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LeaguesPicker from "./LeaguesPicker";
import TeamsPicker from "./TeamsPicker";
import { useWizardState } from "../../context/WizardContext";
import CountriesPicker from "./CountriesPicker";

const Wizard = () => {
    const { countries, leagues } = useWizardState();

    return (
        <Routes>
            <Route path="countries" element={<CountriesPicker />} />
            <Route
                path="leagues"
                element={
                    countries ? (
                        <LeaguesPicker />
                    ) : (
                        <Navigate to="../countries" />
                    )
                }
            />
            <Route
                path="teams"
                element={
                    leagues ? <TeamsPicker /> : <Navigate to="../countries" />
                }
            />
            <Navigate to="countries" />
        </Routes>
    );
};

export default Wizard;
