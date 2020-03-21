import React from "react";
import styled from "styled-components";
import { Country } from "../../../../shared/types";

type Props = {
    country: Country;
    onClick: () => void;
    isSelected?: boolean;
};

const CountryItem: React.FC<Props> = ({ country, onClick, isSelected }) => {
    if (!country.flag) {
        return null;
    }

    return (
        <Container onClick={onClick} isSelected={isSelected}>
            <Flag src={country.flag} alt={country.name} />

            <span>{country.name}</span>
        </Container>
    );
};

const Flag = styled.img`
    height: 30px;
    margin-bottom: 5px;
`;

const Container = styled.div<{ isSelected?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;

    ${({ isSelected }) => isSelected && "border: 1px solid red;"}

    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`;

export default CountryItem;
