import React, { useState } from "react";
import { useWizardState } from "./WizardContext";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Team } from "../../../shared/types";
import TeamItem from "./components/TeamItem";

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
    const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
    const { loading, error, data } = useQuery(GET_TEAMS, {
        variables: { leagues: leagues?.map(league => league.id) }
    });

    function removeTeam(team: Team) {
        setSelectedTeams(selectedTeams.filter(x => x.id !== team.id));
    }

    function selectTeam(team: Team) {
        setSelectedTeams([...selectedTeams, team]);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { teamsByLeagueIds: teams } = data;

    return (
        <div>
            <h1>teams</h1>
            {teams.map((team: Team) => (
                <TeamItem key={team.id} team={team} onClick={() => selectTeam(team)} />
            ))}
        </div>
    );
};

export default TeamsPicker;
