import { gql } from "apollo-boost";
import React, { ChangeEvent, useState } from "react";
import { useWizardDispatch, useWizardState } from "./WizardContext";
import { useQuery } from "@apollo/react-hooks";
import WizardListItem from "./components/WizardListItem";
import { League } from "../../../shared/types";
import styled from "styled-components";
import { Link } from "react-router-dom";
// @ts-ignore
import { Button, InputField } from "@kiwicom/orbit-components";
import WizardContinueButton from "./components/WizardContinueButton";

const GET_LEAGUES = gql`
    query Leagues($countries: [String]!) {
        leaguesByCountryNames(countryNames: $countries) {
            id
            name
            logo
        }
    }
`;

const LeaguesPicker = () => {
    const [selectedLeagues, setSelectedLeagues] = useState<League[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { countries } = useWizardState();
    const dispatch = useWizardDispatch();
    const { loading, error, data } = useQuery(GET_LEAGUES, {
        variables: { countries: countries?.map(country => country.name) }
    });

    function removeLeague(league: League) {
        setSelectedLeagues(selectedLeagues.filter(x => x.name !== league.name));
    }

    function selectLeague(league: League) {
        setSelectedLeagues([...selectedLeagues, league]);
    }

    function isLeagueSelected(league: League) {
        return !!selectedLeagues.find(x => x.id === league.id);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { leaguesByCountryNames: leagues } = data;

    return (
        <Container>
            <InputField
                value={searchTerm}
                placeholder={"League"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />

            <LeaguesList>
                {leagues.map((league: League, index: number) => {
                    const isSelected = isLeagueSelected(league);

                    return (
                        <WizardListItem
                            key={index}
                            name={league.name}
                            isSelected={isSelected}
                            image={league.logo}
                            onClick={() => (isSelected ? removeLeague(league) : selectLeague(league))}
                        />
                    );
                })}
            </LeaguesList>
            <WizardContinueButton
                link="/teams"
                onClick={() => {
                    dispatch({ type: "setLeagues", payload: selectedLeagues });
                }}
                disabled={selectedLeagues.length === 0}
            />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
`;
const LeaguesList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default LeaguesPicker;
