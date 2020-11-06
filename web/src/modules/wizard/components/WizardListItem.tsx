import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import SelectItemButton from "../../../common/SelectItemButton";

type Props = {
    name: string;
    image?: null | string;
    onClick: () => void;
    isSelected?: boolean;
    className?: string;
};

const WizardListItem: React.FC<Props> = ({
    name,
    image,
    onClick,
    isSelected,
    className,
}) => {
    return (
        <motion.div whileTap={{ scale: 0.9 }}>
            <Container
                onClick={onClick}
                isSelected={isSelected}
                className={`rounded-lg ${className}`}
            >
                <SelectItemButton isSelected={isSelected} />

                {image && <Logo src={image} alt={name} />}

                <Name>{name}</Name>
            </Container>
        </motion.div>
    );
};

const Logo = styled.img`
    height: 30px;
    margin-bottom: 5px;
`;

const Name = styled.span`
    font-size: 14px;
    text-align: center;
`;

const Container = styled.div<{ isSelected?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    position: relative;

    background-color: white;
    min-height: 130px;
    border: 2px solid white;
    ${({ isSelected }) => isSelected && "border: 2px solid #ffdb6e;"};

    @media (min-width: 768px) {
        &:hover {
            cursor: pointer;
            border: 2px solid #b9b9b9;
        }
    }
`;

export default WizardListItem;
