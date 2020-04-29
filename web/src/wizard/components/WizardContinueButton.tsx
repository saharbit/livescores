import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import { Button } from "@kiwicom/orbit-components";

interface Props {
    link: string;
    onClick: () => void;
    disabled: boolean;
}

const WizardContinueButton = ({ link, onClick, disabled }: Props) => {
    return (
        <Link to={link} className="wizard-link">
            <Button onClick={onClick} disabled={disabled} className="continue-button">
                Continue
            </Button>
        </Link>
    );
};

export default WizardContinueButton;
