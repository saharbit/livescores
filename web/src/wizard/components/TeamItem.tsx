import React from "react";
import styled from "styled-components";
import { Team } from "../../../../shared/types";

type Props = {
    team: Team;
    onClick: () => void;
};

const TeamItem: React.FC<Props> = ({ team, onClick }) => {
    return (
        <Container onClick={onClick}>
            {team.logo && <Logo src={team.logo} alt={team.name} />}

            <span>{team.name}</span>
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

export default TeamItem;
