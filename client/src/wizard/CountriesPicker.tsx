import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Country from "./components/Country";
import { Country as ICountry } from "../../types";
import styled from "styled-components";

const fetchCountries = gql`
    {
        countries {
            name
            flag
        }
    }
`;

const CountriesPicker = () => {
    const [selectedCountries, setSelectedCountries] = useState<ICountry[]>([]);
    const { loading, error, data } = useQuery(fetchCountries);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Container>
            <h1>Selected countries</h1>
            <CountriesList>
                {selectedCountries.map((country: ICountry, index: number) => (
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
        </Container>
    );
};

const Container = styled.div`
    background: darkolivegreen;
`;

const CountriesList = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #fafafa;
`;

export default CountriesPicker;
