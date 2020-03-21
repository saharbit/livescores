import { gql } from "apollo-boost";
import React, { ChangeEvent, useState } from "react";
import { useWizardDispatch, useWizardState } from "./WizardContext";
import { useQuery } from "@apollo/react-hooks";
import LeagueItem from "./components/LeagueItem";
import { League } from "../../../shared/types";
import styled from "styled-components";
import { Link } from "react-router-dom";
// @ts-ignore
import { Button, InputField } from "@kiwicom/orbit-components";

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

            {leagues.map((league: League, index: number) => (
                <LeagueItem key={index} league={league} onClick={() => selectLeague(league)} />
            ))}

            <Link to="/teams">
                <Button
                    onClick={() => {
                        dispatch({ type: "setLeagues", payload: selectedLeagues });
                    }}
                    disabled={selectedLeagues.length === 0}
                >
                    Continue
                </Button>
            </Link>
        </Container>
    );
};

const Container = styled.div``;

export default LeaguesPicker;
