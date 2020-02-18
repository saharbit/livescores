import { gql } from "apollo-boost";
import React from "react";

const LeaguesByCountryNames = gql`
    {
        leagues {
            name
        }
    }
`;

const LeaguesPicker = () => {
    return <div></div>;
};

export default LeaguesPicker;
