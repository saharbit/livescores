import React from "react";

type User = {
    uid: string | null;
    displayName: string | null;
    email: string | null;
};

interface State {
    user?: User;
}

export const SET_USER = "SET_USER";

type Action = { type: typeof SET_USER; payload: User };

type Dispatch = (action: Action) => void;

type ProviderProps = {
    children: React.ReactNode;
};

function userReducer(state: State, action: Action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        default: {
            return state;
        }
    }
}

const UserStateContext = React.createContext<State | undefined>(undefined);
const UserDispatchContext = React.createContext<Dispatch | undefined>(
    undefined
);

function useUserState() {
    const context = React.useContext(UserStateContext);
    if (context === undefined) {
        throw new Error("useUserState must be used within a UserProvider");
    }
    return context;
}

function useUserDispatch() {
    const context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error("useUserDispatch must be used within a UserProvider");
    }
    return context;
}

function UserProvider({ children }: ProviderProps) {
    const [state, dispatch] = React.useReducer(userReducer, {});

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

export { UserProvider, useUserDispatch, useUserState };
