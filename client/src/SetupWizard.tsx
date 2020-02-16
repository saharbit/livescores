import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Country from "./Country";
import styled from "styled-components";

const Countries = gql`
    {
        countries {
            name
            flag
        }
    }
`;

const LeaguesByCountryNames = gql`
    {
        leagues {
            name
        }
    }
`;

const SetupWizard = () => {
    const [selectedCountries, setSelectedCountries] = useState<any[]>([]);
    const { loading, error, data } = useQuery(Countries);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <h1>Selected countries</h1>
            <CountriesList>
                {selectedCountries.map((country: any, index: number) => (
                    <Country
                        key={index}
                        country={country}
                        onClick={() => null}
                    />
                ))}
            </CountriesList>

            <h1>Available countries</h1>
            <CountriesList>
                {data.countries.map((country: any, index: number) => (
                    <Country
                        key={index}
                        country={country}
                        onClick={() =>
                            setSelectedCountries([
                                ...selectedCountries,
                                country
                            ])
                        }
                    />
                ))}
            </CountriesList>
        </>
    );
};

const CountriesList = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #fafafa;
`;

export default SetupWizard;
