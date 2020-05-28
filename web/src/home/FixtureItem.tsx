import React from "react";
import { Fixture } from "../../../shared/types";
import styled from "styled-components";
import dayjs from "dayjs";

type Props = {
    fixture: Fixture;
};

const FixtureItem: React.FC<Props> = ({ fixture }) => {
    return (
        <Container className="flex flex-row justify-between items-center">
            <div className="flex flex-row flex-1">
                {dayjs(fixture.date).format("DD/MM/YYYY")}
            </div>

            <div className="flex flex-row flex-1 items-center">
                {fixture.homeTeam.logo && (
                    <Logo src={fixture.homeTeam.logo} alt="Home Team Logo" />
                )}
                <div>{fixture.homeTeam.name}</div>
            </div>

            <div className="flex flex-row flex-1 items-center">
                {fixture.awayTeam.logo && (
                    <Logo src={fixture.awayTeam.logo} alt="Home Team Logo" />
                )}
                <div>{fixture.awayTeam.name}</div>
            </div>

            <div className="flex flex-row flex-1">{fixture.venue}</div>
        </Container>
    );
};

const Container = styled.div``;

const Logo = styled.img`
    height: 30px;
    margin: 5px;
`;
export default FixtureItem;
