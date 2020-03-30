import React from "react";
import styled from "styled-components";
import Maybe from "graphql/tsutils/Maybe";
// @ts-ignore
import StarEmpty from "@kiwicom/orbit-components/lib/icons/StarEmpty";

type Props = {
    name: string;
    image?: Maybe<string>;
    onClick: () => void;
    isSelected?: boolean;
};

const WizardListItem: React.FC<Props> = ({ name, image, onClick, isSelected }) => {
    return (
        <Container onClick={onClick} isSelected={isSelected}>
            <SelectItem isSelected={isSelected}>
                <StarEmpty size="small" customColor={isSelected ? "#000" : "#ffdb6e"} className="small-icon" />
            </SelectItem>

            {image && <Logo src={image} alt={name} />}

            <Name>{name}</Name>
        </Container>
    );
};

const Logo = styled.img`
    height: 30px;
    margin-bottom: 5px;
`;

const SelectItem = styled.div<{ isSelected?: boolean }>`
    border: 1px solid #ffdb6e;
    background-color: white;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    position: absolute;
    right: 5px;
    top: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${({ isSelected }) => isSelected && "background-color: #ffdb6e;"}
`;

const Name = styled.span`
    font-weight: bold;
    font-size: 12px;
    text-align: center;
`;

const Container = styled.div<{ isSelected?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: white;
    width: 100px;
    height: 120px;
    border: 1px solid white;
    position: relative;

    &:hover {
        cursor: pointer;
        opacity: 0.7;
        border: 1px solid #b9b9b9;
    }
`;

export default WizardListItem;
