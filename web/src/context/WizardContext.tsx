import React from "react";
import { Country, League, Team } from "../../../shared/types";

interface State {
    countries?: Country[];
    leagues?: League[];
    teams?: Team[];
}

export const SET_COUNTRIES = "SET_COUNTRIES";
export const SET_LEAGUES = "SET_LEAGUES";
export const SET_TEAMS = "SET_TEAMS";

type Action =
    | { type: typeof SET_COUNTRIES; payload: Country[] }
    | { type: typeof SET_LEAGUES; payload: League[] }
    | { type: typeof SET_TEAMS; payload: Team[] };

type Dispatch = (action: Action) => void;

type ProviderProps = {
    children: React.ReactNode;
};

function wizardReducer(state: State, action: Action) {
    switch (action.type) {
        case SET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            };
        case SET_LEAGUES:
            return {
                ...state,
                leagues: action.payload,
            };
        case SET_TEAMS:
            return {
                ...state,
                teams: action.payload,
            };
        default: {
            return state;
        }
    }
}

const WizardStateContext = React.createContext<State | undefined>(undefined);
const WizardDispatchContext = React.createContext<Dispatch | undefined>(
    undefined
);

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
        throw new Error(
            "useWizardDispatch must be used within a WizardProvider"
        );
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
