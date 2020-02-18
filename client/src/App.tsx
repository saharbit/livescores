import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WizardRouter from "./wizard/WizardRouter";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <WizardRouter />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
