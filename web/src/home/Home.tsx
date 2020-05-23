import React from "react";
import { useWizardState } from "../context/WizardContext";

const Home = () => {
    const { teams } = useWizardState();

    return (
        <div>
            {teams!.map((team) => (
                <div>{team.name}</div>
            ))}
        </div>
    );
};

export default Home;
