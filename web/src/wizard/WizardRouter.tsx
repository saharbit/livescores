import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import CountriesPicker from "./CountriesPicker";
import LeaguesPicker from "./LeaguesPicker";
import TeamsPicker from "./TeamsPicker";
import { useWizardState } from "./WizardContext";

const WizardRouter = () => {
    const { countries, leagues } = useWizardState();

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <CountriesPicker />
                </Route>
                <Route path="/leagues">{countries ? <LeaguesPicker /> : <Redirect to="/" />}</Route>
                <Route path="/teams">{leagues ? <TeamsPicker /> : <Redirect to="/" />}</Route>
            </Switch>
        </Router>
    );
};

export default WizardRouter;
