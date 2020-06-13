import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@kiwicom/orbit-components";

type Props = {
    link?: string;
    onClick: () => void;
    disabled?: boolean;
    text: string;
};

const BottomFixedButton: React.FC<Props> = ({
    link,
    onClick,
    disabled,
    text,
}) => {
    const button = (
        <Button onClick={onClick} fullWidth disabled={disabled}>
            {text}
        </Button>
    );

    const className = `container xl:max-w-screen-lg fixed bottom-0 ${
        disabled ? "pointer-events-none" : ""
    }`;

    return link ? (
        <Link to={link} className={className}>
            {button}
        </Link>
    ) : (
        <div className={className}>{button}</div>
    );
};

export default BottomFixedButton;
