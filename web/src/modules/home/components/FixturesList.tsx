import React, { Fragment } from "react";
import _ from "lodash";
import FixturesListItem from "./FixturesListItem";
import styled from "styled-components";
import { Fixture } from "../../../../../shared/types";
import { getFixturesByLeague } from "../utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type FixturesByDate = { [date: string]: Fixture[] };
type Props = {
    fixtures: FixturesByDate;
};

const FixturesList: React.FC<Props> = ({ fixtures }) => {
    return (
        <Container className="mx-2 md:mx-0">
            {_.map(fixtures, (fixtures, date) => {
                return (
                    <Fragment key={date}>
                        <Date className="font-bold mb-2 mt-6">
                            {dayjs(date).format("dddd, DD/MM/YYYY")}
                        </Date>
                        {_.map(
                            getFixturesByLeague(fixtures),
                            (fixtures, leagueId) => {
                                const { league } = fixtures[0];

                                return (
                                    <Fragment key={leagueId}>
                                        <League className="my-2 font-bold text-sm">
                                            {league.logo && (
                                                <Logo
                                                    src={league.logo}
                                                    alt={league.name}
                                                />
                                            )}
                                            {league.name}
                                        </League>
                                        {fixtures.map((fixture) => (
                                            <FixturesListItem
                                                key={fixture.id}
                                                fixture={fixture}
                                            />
                                        ))}
                                    </Fragment>
                                );
                            }
                        )}
                    </Fragment>
                );
            })}
        </Container>
    );
};

const Container = styled.div`
    max-height: calc(100vh - 60px);
`;

const Logo = styled.img`
    width: 24px;
    margin-right: 5px;
`;

const Date = styled.div`
    font-size: 20px;
`;

const League = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export default FixturesList;
