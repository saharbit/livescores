import React from "react";
import styled from "styled-components";

const Country = ({ country, onClick }: { country: any; onClick: any }) => {
    if (!country.flag) {
        return null;
    }

    return (
        <Container onClick={onClick}>
            <Flag src={country.flag} alt={country.name} />

            <span>{country.name}</span>
        </Container>
    );
};

const Flag = styled.img`
    height: 30px;
    width: 150px;
    margin-bottom: 5px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;

    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`;

export default Country;
