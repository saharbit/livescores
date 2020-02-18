import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SetupWizard from "./SetupWizard";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <SetupWizard />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
