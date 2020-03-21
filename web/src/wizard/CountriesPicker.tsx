import React, { ChangeEvent, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import CountryItem from "./components/CountryItem";
import { Country } from "../../../shared/types";
import styled from "styled-components";
// @ts-ignore
import { Button, InputField } from "@kiwicom/orbit-components";
import { Link } from "react-router-dom";
import { useWizardDispatch } from "./WizardContext";

export const GET_COUNTRIES = gql`
    {
        countries {
            name
            flag
        }
    }
`;

const CountriesPicker = () => {
    const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const dispatch = useWizardDispatch();
    const { loading, error, data } = useQuery(GET_COUNTRIES);

    function removeCountry(country: Country) {
        setSelectedCountries(selectedCountries.filter(x => x.name !== country.name));
    }

    function selectCountry(country: Country) {
        setSelectedCountries([...selectedCountries, country]);
        setSearchTerm("");
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Container>
            <InputField
                placeholder={"Country"}
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <CountriesList>
                {selectedCountries.map((country: Country, index: number) => (
                    <CountryItem key={index} country={country} onClick={() => removeCountry(country)} isSelected={true} />
                ))}
                {searchTerm &&
                    data.countries
                        .filter((country: Country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((country: Country, index: number) => (
                            <CountryItem key={index} country={country} onClick={() => selectCountry(country)} />
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

const Container = styled.div``;

const CountriesList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default CountriesPicker;
