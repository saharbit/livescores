import React, { ChangeEvent, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Country from "./components/Country";
import { Country as ICountry } from "../../../shared/types";
import styled from "styled-components";
// @ts-ignore
import { Button, InputField } from "@kiwicom/orbit-components";
import { Link } from "react-router-dom";
import { useWizardDispatch } from "./WizardContext";

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
    const [searchTerm, setSearchTerm] = useState<string>("");
    const dispatch = useWizardDispatch();
    const { loading, error, data } = useQuery(fetchCountries);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    function removeCountry(country: ICountry) {
        setSelectedCountries(selectedCountries.filter(x => x.name !== country.name));
    }

    function selectCountry(country: ICountry) {
        setSelectedCountries([...selectedCountries, country]);
    }

    return (
        <Container>
            <h1>Selected countries</h1>
            <CountriesList>
                {selectedCountries.map((country: ICountry, index: number) => (
                    <Country key={index} country={country} onClick={() => removeCountry(country)} />
                ))}
            </CountriesList>

            <h1>Add countries</h1>
            <InputField
                placeholder={"Country"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <CountriesList>
                {searchTerm &&
                    data.countries
                        .filter((country: ICountry) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((country: ICountry, index: number) => (
                            <Country key={index} country={country} onClick={() => selectCountry(country)} />
                        ))}
            </CountriesList>

            <Link to="/leagues">
                <Button
                    onClick={() => {
                        dispatch({ type: "setCountries", payload: selectedCountries });
                    }}
                    disabled={selectedCountries.length === 0}
                >
                    Continue
                </Button>
            </Link>
        </Container>
    );
};

const Container = styled.div`
    background-color: #f6fbf9;
`;

const CountriesList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default CountriesPicker;
