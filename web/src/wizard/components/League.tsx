import React from "react";
import styled from "styled-components";
import { League as ILeague } from "../../../../shared/types";

type Props = {
    league: ILeague;
    onClick: () => void;
};

const League: React.FC<Props> = ({ league, onClick }) => {
    if (!league.logo) {
        return null;
    }

    return (
        <Container onClick={onClick}>
            <Logo src={league.logo} alt={league.name} />

            <span>{league.name}</span>
        </Container>
    );
};

const Logo = styled.img`
    height: 30px;
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

export default League;
