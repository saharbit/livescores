import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@kiwicom/orbit-components";
import { motion } from "framer-motion";

interface Props {
    link: string;
    onClick: () => void;
    disabled: boolean;
}

const WizardContinueButton = ({ link, onClick, disabled }: Props) => {
    return (
        <Link to={link} className="container xl:max-w-screen-lg fixed bottom-0 wizard-link">
            <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 1 },
                }}
            >
                <Button onClick={onClick} disabled={disabled} fullWidth>
                    Continue
                </Button>
            </motion.div>
        </Link>
    );
};

export default WizardContinueButton;
