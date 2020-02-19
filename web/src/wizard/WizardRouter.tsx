import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import CountriesPicker from "./CountriesPicker";
import LeaguesPicker from "./LeaguesPicker";
import TeamsPicker from "./TeamsPicker";

const WizardRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <CountriesPicker />
                </Route>
                <Route path="/leagues">
                    <LeaguesPicker />
                </Route>
                <Route path="/teams">
                    <TeamsPicker />
                </Route>
            </Switch>
        </Router>
    );
};

export default WizardRouter;
