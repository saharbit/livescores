import React from "react";
import CountriesPicker from "./wizard/CountriesPicker";
import LeaguesPicker from "./wizard/LeaguesPicker";
import TeamsPicker from "./wizard/TeamsPicker";
import Home from "./home/Home";
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<CountriesPicker />} />
            <Route path="/leagues" element={<LeaguesPicker />} />
            <Route path="/teams" element={<TeamsPicker />} />
        </Routes>
    );
};

export default App;
