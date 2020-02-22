import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import CountriesPicker from "./CountriesPicker";
import LeaguesPicker from "./LeaguesPicker";
import TeamsPicker from "./TeamsPicker";
// @ts-ignore
import Layout, { LayoutColumn } from "@kiwicom/orbit-components/lib/Layout";
import { WizardProvider } from "./WizardContext";

const WizardRouter = () => {
    return (
        <WizardProvider>
            <Layout type="MMB">
                <LayoutColumn>
                    <Router>
                        <Switch>
                            <Route exact path="/">
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
                </LayoutColumn>
            </Layout>
        </WizardProvider>
    );
};

export default WizardRouter;
