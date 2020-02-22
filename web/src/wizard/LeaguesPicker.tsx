import { gql } from "apollo-boost";
import React from "react";
import { useWizardState } from "./WizardContext";
import { useQuery } from "@apollo/react-hooks";

const LeaguesByCountryNames = gql`
    query getLeagues($country: String!){
        leagues(country: $country) {
            name
        }
    }
`;

const LeaguesPicker = () => {
    const { countries } = useWizardState();
    const { loading, error, data } = useQuery(LeaguesByCountryNames, { variables: { country: countries![0].name } });
    return <div></div>;
};

export default LeaguesPicker;
