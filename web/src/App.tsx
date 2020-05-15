import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WizardRouter from "./wizard/WizardRouter";
import { WizardProvider } from "./wizard/WizardContext";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <WizardProvider>
                        <WizardRouter />
                    </WizardProvider>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
