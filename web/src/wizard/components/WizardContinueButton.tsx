import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@kiwicom/orbit-components";

interface Props {
    link: string;
    onClick: () => void;
    disabled: boolean;
}

const WizardContinueButton: React.FC<Props> = ({ link, onClick, disabled }) => {
    return (
        <Link
            to={link}
            className={`container xl:max-w-screen-lg fixed bottom-0 ${disabled ? "pointer-events-none" : ""}`}
        >
            <Button onClick={onClick} fullWidth disabled={disabled}>
                Continue
            </Button>
        </Link>
    );
};

export default WizardContinueButton;
