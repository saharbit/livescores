import React from "react";
import styled from "styled-components";
import Maybe from "graphql/tsutils/Maybe";

type Props = {
    name: string;
    image?: Maybe<string>;
    onClick: () => void;
    isSelected?: boolean;
};

const WizardListItem: React.FC<Props> = ({ name, image, onClick, isSelected }) => {
    return (
        <Container onClick={onClick} isSelected={isSelected}>
            {image && <Logo src={image} alt={name} />}

            <Name>{name}</Name>
        </Container>
    );
};

const Logo = styled.img`
    height: 30px;
    margin-bottom: 5px;
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
    margin: 10px;
    width: 100px;
    height: 120px;
    border: 1px solid white;

    ${({ isSelected }) => isSelected && "border: 1px solid red;"}

    &:hover {
        cursor: pointer;
        opacity: 0.7;
        border: 1px solid #b9b9b9;
    }
`;

export default WizardListItem;
