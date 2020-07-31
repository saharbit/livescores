import React from "react";
import { Fixture } from "../../../../../shared/types";
import styled from "styled-components";
import dayjs from "dayjs";
import { useWizardState } from "../../../context/WizardContext";

type Props = {
    fixture: Fixture;
};

type TeamRowProps = {
    name: string;
    logo?: string | null;
    score: number;
    isFavorite: boolean;
};

const TeamRow: React.FC<TeamRowProps> = ({ name, logo, score, isFavorite }) => {
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
                {logo && <Logo src={logo} alt="Team Logo" />}
                <TeamName isFavorite={isFavorite}>{name}</TeamName>
            </div>
            <Score>{score}</Score>
        </div>
    );
};

const FixturesListItem: React.FC<Props> = ({ fixture }) => {
    const { teams } = useWizardState();

    return (
        <Container className="flex flex-col mb-1">
            <div className="flex flex-row justify-between items-center mb-2">
                <Venue>{fixture.venue}</Venue>

                <MatchTime className="flex flex-row">
                    {dayjs(fixture.date).format("HH:mm")}
                </MatchTime>
            </div>
            <TeamRow
                name={fixture.homeTeam.name}
                logo={fixture.homeTeam.logo}
                score={0}
                isFavorite={!!teams?.find((id) => id === fixture.homeTeam.id)}
            />
            <TeamRow
                name={fixture.awayTeam.name}
                logo={fixture.awayTeam.logo}
                score={0}
                isFavorite={!!teams?.find((id) => id === fixture.awayTeam.id)}
            />
        </Container>
    );
};

const Container = styled.div`
    background-color: white;
    padding: 10px;
`;

const Logo = styled.img`
    height: 25px;
    margin: 5px 10px 5px 0;
`;

const MatchTime = styled.div`
    background-color: #e4f2ee;
    padding: 5px 10px;
    border-radius: 20px;
    color: #5b7169;
    font-weight: bold;
    font-size: 12px;
`;

const Venue = styled.div`
    color: #9a9e9d;
    font-weight: bold;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const TeamName = styled.div<{ isFavorite: boolean }>`
    color: #9a9e9d;
    font-weight: 500;

    ${(props) => props.isFavorite && `font-weight: 700;`}
`;

const Score = styled.div`
    color: #9a9e9d;
    font-weight: 500;
`;

export default FixturesListItem;
