import React, { useState } from "react";
import { SET_TEAMS, useWizardDispatch, useWizardState } from "../context/WizardContext";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Team } from "../../../shared/types";
import WizardListItem from "./components/WizardListItem";
import WizardContinueButton from "./components/WizardContinueButton";
import Search from "@kiwicom/orbit-components/lib/icons/Search";
import { InputField } from "@kiwicom/orbit-components";
import WizardContainer from "./components/WizardContainer";
import WizardList from "./components/WizardList";
import { Loading } from "@kiwicom/orbit-components/lib";

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
        variables: { leagues: leagues?.map((league) => league.id) },
    });

    function removeTeam(team: Team) {
        setSelectedTeams(selectedTeams.filter((x) => x.id !== team.id));
    }

    function selectTeam(team: Team) {
        setSelectedTeams([...selectedTeams, team]);
    }

    function isTeamIncludedInSearch(team: Team) {
        return team.name.toLowerCase().includes(searchTerm.toLowerCase());
    }

    function isTeamSelected(team: Team) {
        return !!selectedTeams.find((x) => x.name === team.name);
    }

    return (
        <WizardContainer>
            <InputField
                placeholder={"Search for team"}
                value={searchTerm}
                onChange={(event: any) => setSearchTerm(event.target.value)}
                prefix={<Search />}
                disabled={loading}
            />
            {loading ? (
                <Loading />
            ) : (
                <WizardList>
                    {data.teamsByLeagueIds
                        .filter(isTeamIncludedInSearch)
                        .sort((team: Team) => (isTeamSelected(team) ? -1 : 1))
                        .map((team: Team) => {
                            const isSelected = isTeamSelected(team);

                            return (
                                <WizardListItem
                                    key={team.id}
                                    name={team.name}
                                    image={team.logo}
                                    onClick={() => (isSelected ? removeTeam(team) : selectTeam(team))}
                                    isSelected={isSelected}
                                />
                            );
                        })}
                </WizardList>
            )}
            <WizardContinueButton
                link="/home"
                onClick={() => {
                    dispatch({ type: SET_TEAMS, payload: selectedTeams });
                }}
                disabled={selectedTeams.length === 0}
            />
        </WizardContainer>
    );
};

export default TeamsPicker;
