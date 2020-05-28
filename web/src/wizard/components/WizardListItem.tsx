import React from "react";
import styled from "styled-components";
import Maybe from "graphql/tsutils/Maybe";
import StarEmpty from "@kiwicom/orbit-components/lib/icons/StarEmpty";
import { motion } from "framer-motion";

type Props = {
    name: string;
    image?: Maybe<string>;
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
                className={className}
            >
                <Select isSelected={isSelected}>
                    <StarEmpty
                        size="small"
                        customColor={isSelected ? "#000" : "#ffdb6e"}
                        className="h-1 w-1"
                    />
                </Select>

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

const Select = styled.div<{ isSelected?: boolean }>`
    border: 1px solid #ffdb6e;
    background-color: white;
    height: 20px;
    width: 20px;
    border-radius: 9px;
    position: absolute;
    right: 5px;
    top: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${({ isSelected }) => isSelected && "background-color: #ffdb6e;"}
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
    min-height: 120px;
    border: 2px solid white;
    border-radius: 10px;
    ${({ isSelected }) => isSelected && "border: 2px solid #ffdb6e;"};

    @media (min-width: 768px) {
        &:hover {
            cursor: pointer;
            border: 2px solid #b9b9b9;
        }
    }
`;

export default WizardListItem;
