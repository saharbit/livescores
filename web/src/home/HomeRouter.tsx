import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./Home";

const WizardRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
};

export default WizardRouter;
