import React from "react";
import { Fixture } from "../../../shared/types";
import styled from "styled-components";
import dayjs from "dayjs";

type Props = {
    fixture: Fixture;
};

const FixturesListItem: React.FC<Props> = ({ fixture }) => {
    return (
        <Container className="flex flex-col">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row">{fixture.venue}</div>
                <div className="flex flex-row">
                    {dayjs(fixture.date).format("HH:mm")}
                </div>
            </div>

            <div className="flex flex-row items-center">
                {fixture.homeTeam.logo && (
                    <Logo src={fixture.homeTeam.logo} alt="Home Team Logo" />
                )}
                <div>{fixture.homeTeam.name}</div>
            </div>
            <div className="flex flex-row items-center">
                {fixture.awayTeam.logo && (
                    <Logo src={fixture.awayTeam.logo} alt="Away Team Logo" />
                )}
                <div>{fixture.awayTeam.name}</div>
            </div>
        </Container>
    );
};

const Container = styled.div`
    background-color: white;
    border: 1px solid lightgrey;
    padding: 10px;
    max-width: 400px;
`;

const Logo = styled.img`
    height: 30px;
    margin: 5px;
`;
export default FixturesListItem;
