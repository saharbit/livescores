import { gql } from "apollo-boost";
import React, { ChangeEvent, useState } from "react";
import { useWizardDispatch, useWizardState } from "./WizardContext";
import { useQuery } from "@apollo/react-hooks";
import League from "./components/League";
import { League as ILeague } from "../../../shared/types";
import styled from "styled-components";
import { Link } from "react-router-dom";
// @ts-ignore
import { Button, InputField } from "@kiwicom/orbit-components";

const GET_LEAGUES = gql`
    query getLeagues($countries: [String]!) {
        leaguesByCountries(countries: $countries) {
            name
            logo
        }
    }
`;

const LeaguesPicker = () => {
    const [selectedLeagues, setSelectedLeagues] = useState<ILeague[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { countries } = useWizardState();
    const dispatch = useWizardDispatch();
    const { loading, error, data } = useQuery(GET_LEAGUES, {
        variables: { countries: countries?.map(country => country.name) }
    });

    function removeLeague(league: ILeague) {
        setSelectedLeagues(selectedLeagues.filter(x => x.name !== league.name));
    }

    function selectLeague(league: ILeague) {
        setSelectedLeagues([...selectedLeagues, league]);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Container>
            <InputField
                placeholder={"League"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />

            {data.leaguesByCountries.map((league: ILeague, index: number) => (
                <League key={index} league={league} onClick={() => selectLeague(league)} />
            ))}

            <Link to="/leagues">
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
