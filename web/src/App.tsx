import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WizardRouter from "./wizard/WizardRouter";
import { WizardProvider } from "./wizard/WizardContext";
// @ts-ignore
import Layout, { LayoutColumn } from "@kiwicom/orbit-components/lib/Layout";
import "./styles/index.css";

const App = () => {
    return (
        // <Layout type="MMB">
        //     <LayoutColumn>
                <Router>
                    <Switch>
                        <Route path="/">
                            <WizardProvider>
                                <WizardRouter />
                            </WizardProvider>
                        </Route>
                    </Switch>
                </Router>
            // </LayoutColumn>
        // </Layout>
    );
};

export default App;
