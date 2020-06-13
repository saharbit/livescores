import React from "react";
import Home from "./home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useWizardState } from "./context/WizardContext";
import Wizard from "./wizard/Wizard";

const App = () => {
    const { teams } = useWizardState();

    return (
        <Routes>
            <Route
                path="/"
                element={teams ? <Home /> : <Navigate to="/wizard/countries" />}
            />
            <Route path="wizard/*" element={<Wizard />} />
        </Routes>
    );
};

export default App;
