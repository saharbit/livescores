import React, { useState } from "react";
import { Fixture } from "../../../../../shared/types";
import styled from "styled-components";
import dayjs from "dayjs";
import { useWizardState } from "../../../context/WizardContext";
import SelectItemButton from "../../../common/SelectItemButton";
import { motion } from "framer-motion";

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
    const [selectedFixtures, setSelectedFixtures] = useState<{
        [key: string]: boolean;
    }>({});
    const isSelected = selectedFixtures[fixture.id];

    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Container
                className="flex flex-col mb-2 rounded-md border-2"
                onClick={() => {
                    const updatedFixtures = { ...selectedFixtures };

                    if (isSelected) {
                        delete updatedFixtures[fixture.id];
                        setSelectedFixtures(updatedFixtures);
                    } else {
                        setSelectedFixtures({
                            ...selectedFixtures,
                            [fixture.id]: true,
                        });
                    }
                }}
                isSelected={isSelected}
            >
                <div className="flex flex-row justify-between items-center mb-2">
                    <div className="flex flex-row">
                        <SelectItemButton isSelected={isSelected} />
                        <Venue>{fixture.venue}</Venue>
                    </div>

                    <MatchTime className="flex flex-row">
                        {dayjs(fixture.date).format("HH:mm")}
                    </MatchTime>
                </div>
                <TeamRow
                    name={fixture.homeTeam.name}
                    logo={fixture.homeTeam.logo}
                    score={0}
                    isFavorite={
                        !!teams?.find((id) => id === fixture.homeTeam.id)
                    }
                />
                <TeamRow
                    name={fixture.awayTeam.name}
                    logo={fixture.awayTeam.logo}
                    score={0}
                    isFavorite={
                        !!teams?.find((id) => id === fixture.awayTeam.id)
                    }
                />
            </Container>
        </motion.div>
    );
};

const Container = styled.div<{ isSelected?: boolean }>`
    background-color: white;
    padding: 10px;
    @media (min-width: 768px) {
        &:hover {
            cursor: pointer;
            ${({ isSelected }) =>
                isSelected
                    ? "border: 2px solid #ffdb6e;"
                    : "border: 2px solid #b9b9b9;"};
        }
    }
    ${({ isSelected }) => isSelected && "border: 2px solid #ffdb6e;"};
`;

const Logo = styled.img`
    width: 25px;
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
    margin-left: 10px;
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
