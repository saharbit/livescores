import React, { useState } from "react";
import { useWizardDispatch, useWizardState } from "./WizardContext";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Team } from "../../../shared/types";
import WizardListItem from "./components/WizardListItem";
import styled from "styled-components";
import WizardContinueButton from "./components/WizardContinueButton";
// @ts-ignore
import { Search } from "@kiwicom/orbit-components/lib/icons";
import { InputField } from "@kiwicom/orbit-components";

const GET_TEAMS = gql`
    query Teams($leagues: [Int]!) {
        teamsByLeagueIds(leagueIds: $leagues) {
            id
            name
            logo
        }
    }
`;

const TeamsPicker = () => {
    const { leagues } = useWizardState();
    const dispatch = useWizardDispatch();
    const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { loading, error, data } = useQuery(GET_TEAMS, {
        variables: { leagues: leagues?.map(league => league.id) }
    });

    function removeTeam(team: Team) {
        setSelectedTeams(selectedTeams.filter(x => x.id !== team.id));
    }

    function selectTeam(team: Team) {
        setSelectedTeams([...selectedTeams, team]);
    }

    function isTeamIncludedInSearch(team: Team) {
        return team.name.toLowerCase().includes(searchTerm.toLowerCase());
    }

    function isTeamSelected(team: Team) {
        return !!selectedTeams.find(x => x.name === team.name);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { teamsByLeagueIds: teams } = data;

    return (
        <Container>
            <InputField
                placeholder={"Search for team"}
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                prefix={<Search />}
            />

            <TeamsList>
                {teams
                    .filter(isTeamIncludedInSearch)
                    .sort((team: Team) => (isTeamSelected(team) ? -1 : 1))
                    .map((team: Team) => {
                        const isSelected = isTeamSelected(team);

                        return (
                            <WizardListItem
                                key={team.id}
                                name={team.name}
                                image={team.logo}
                                onClick={() => selectTeam(team)}
                                isSelected={isSelected}
                            />
                        );
                    })}
            </TeamsList>
            <WizardContinueButton
                link="/teams"
                onClick={() => {
                    dispatch({ type: "setTeams", payload: selectedTeams });
                }}
                disabled={selectedTeams.length === 0}
            />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
`;
const TeamsList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default TeamsPicker;
