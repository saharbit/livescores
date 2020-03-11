import React from "react";
import { Country, League } from "../../../shared/types";

interface State {
    countries?: Country[];
    leagues?: League[];
    teams?: any[];
}

type Action =
    | { type: "setCountries"; payload: Country[] }
    | { type: "setLeagues"; payload: League[] }
    | { type: "setTeams"; payload: any[] };

type Dispatch = (action: Action) => void;
type ProviderProps = {
    children: React.ReactNode;
};

function wizardReducer(state: State, action: Action) {
    switch (action.type) {
        case "setCountries":
            return {
                ...state,
                countries: action.payload
            };
        case "setLeagues":
            return {
                ...state,
                leagues: action.payload
            };
        case "setTeams":
            return {
                ...state,
                teams: action.payload
            };
        default: {
            return state;
        }
    }
}

const WizardStateContext = React.createContext<State | undefined>(undefined);
const WizardDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function useWizardState() {
    const context = React.useContext(WizardStateContext);
    if (context === undefined) {
        throw new Error("useWizardState must be used within a WizardProvider");
    }
    return context;
}

function useWizardDispatch() {
    const context = React.useContext(WizardDispatchContext);
    if (context === undefined) {
        throw new Error("useWizardDispatch must be used within a WizardProvider");
    }
    return context;
}

function WizardProvider({ children }: ProviderProps) {
    const [state, dispatch] = React.useReducer(wizardReducer, {});
    return (
        <WizardStateContext.Provider value={state}>
            <WizardDispatchContext.Provider value={dispatch}>
                {children}
            </WizardDispatchContext.Provider>
        </WizardStateContext.Provider>
    );
}

export { WizardProvider, useWizardDispatch, useWizardState };


