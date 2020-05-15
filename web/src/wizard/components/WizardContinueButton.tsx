import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@kiwicom/orbit-components";

interface Props {
    link: string;
    onClick: () => void;
    disabled: boolean;
}

const WizardContinueButton = ({ link, onClick, disabled }: Props) => {
    return (
        <Link to={link} className="container fixed bottom-0 mx-auto">
            <Button
                onClick={onClick}
                disabled={disabled}
                fullWidth
            >
                Continue
            </Button>
        </Link>
    );
};

export default WizardContinueButton;
