import { gql } from "apollo-boost";
import React from "react";
import { useWizardState } from "./WizardContext";
import { useQuery } from "@apollo/react-hooks";
import League from "./components/League";
import { League as ILeague } from "../../../shared/types";

const GET_LEAGUES = gql`
    query getLeagues($country: String!) {
        leaguesByCountry(country: $country) {
            name
            logo
        }
    }
`;

const LeaguesPicker = () => {
    const { countries } = useWizardState();
    const { loading, error, data } = useQuery(GET_LEAGUES, {
        variables: { country: countries ? countries[0].name : "england" }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            {data.leagues.map((league: ILeague, index: number) => (
                <League key={index} league={league} onClick={() => true} />
            ))}
        </div>
    );
};

export default LeaguesPicker;
