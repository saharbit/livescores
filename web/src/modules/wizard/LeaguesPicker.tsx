import { gql } from "apollo-boost";
import React, { useState } from "react";
import {
    SET_LEAGUES,
    useWizardDispatch,
    useWizardState,
} from "../../context/WizardContext";
import { useQuery } from "@apollo/react-hooks";
import WizardListItem from "./components/WizardListItem";
import { League } from "../../../../shared/types";
import BottomFixedButton from "../../common/BottomFixedButton";
import WizardList from "./components/WizardList";
import { Loading } from "@kiwicom/orbit-components/lib";
import WizardSearchInput from "./components/WizardSearchInput";

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
        variables: { countries: countries?.map((country) => country.name) },
    });

    function removeLeague(league: League) {
        setSelectedLeagues(
            selectedLeagues.filter((x) => x.name !== league.name)
        );
    }

    function selectLeague(league: League) {
        setSelectedLeagues([...selectedLeagues, league]);
    }

    function isLeagueSelected(league: League) {
        return !!selectedLeagues.find((x) => x.id === league.id);
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
                placeholder={"Search for league"}
            />
            {loading ? (
                <Loading />
            ) : (
                <WizardList>
                    {data.leaguesByCountryNames.map(
                        (league: League, index: number) => {
                            const isSelected = isLeagueSelected(league);

                            return (
                                <WizardListItem
                                    key={index}
                                    name={league.name}
                                    isSelected={isSelected}
                                    image={league.logo}
                                    onClick={() =>
                                        isSelected
                                            ? removeLeague(league)
                                            : selectLeague(league)
                                    }
                                />
                            );
                        }
                    )}
                </WizardList>
            )}
            <BottomFixedButton
                link="../teams"
                text="Select teams"
                onClick={() => {
                    dispatch({ type: SET_LEAGUES, payload: selectedLeagues });
                }}
                disabled={selectedLeagues.length === 0}
            />
        </>
    );
};

export default LeaguesPicker;
