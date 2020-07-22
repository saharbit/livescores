import React, { useState } from "react";
import {
    SET_TEAMS,
    useWizardDispatch,
    useWizardState,
} from "../../context/WizardContext";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Team } from "../../../../shared/types";
import WizardListItem from "./components/WizardListItem";
import BottomFixedButton from "../../common/BottomFixedButton";
import WizardList from "./components/WizardList";
import { Loading } from "@kiwicom/orbit-components/lib";
import WizardSearchInput from "./components/WizardSearchInput";
import { db } from "../../services/Firebase";
import { useUserState } from "../../context/UserContext";

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
    const { user } = useUserState();
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

    if (error) {
        return <div>error :(</div>;
    }

    return (
        <>
            <WizardSearchInput
                onChange={setSearchTerm}
                value={searchTerm}
                disabled={loading}
                placeholder={"Search for team"}
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
                                    onClick={() =>
                                        isSelected
                                            ? removeTeam(team)
                                            : selectTeam(team)
                                    }
                                    isSelected={isSelected}
                                />
                            );
                        })}
                </WizardList>
            )}
            <BottomFixedButton
                link="/"
                text="DONE"
                onClick={() => {
                    const teamIds = selectedTeams.map((team) => team.id);

                    dispatch({
                        type: SET_TEAMS,
                        payload: teamIds,
                    });
                    const userDoc = db.collection("users").doc(user!.uid!);
                    userDoc.set(
                        {
                            teams: teamIds,
                        },
                        { merge: true }
                    );
                }}
                disabled={selectedTeams.length === 0}
            />
        </>
    );
};

export default TeamsPicker;