import React, { ChangeEvent, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Country } from "../../../shared/types";
import styled from "styled-components";
// @ts-ignore
import { Button, InputField } from "@kiwicom/orbit-components";
// @ts-ignore
import Search from "@kiwicom/orbit-components/lib/icons/Search";
import { Link } from "react-router-dom";
import { useWizardDispatch } from "./WizardContext";
import WizardListItem from "./components/WizardListItem";

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

    function isCountryIncludedInSearch(country: Country) {
        return country.name.toLowerCase().includes(searchTerm.toLowerCase());
    }

    return (
        <Container>
            <Header>
                <h3>Choose your Countries</h3>
                <span>skip</span>
            </Header>
            <InputContainer>
                <InputField
                    placeholder={"Search for Country"}
                    value={searchTerm}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    prefix={<Search />}
                />
            </InputContainer>
            <CountriesList>
                {selectedCountries.map((country: Country, index: number) => (
                    <WizardListItem
                        key={index}
                        name={country.name}
                        image={country.flag}
                        isSelected={true}
                        onClick={() => removeCountry(country)}
                    />
                ))}
                {data.countries.filter(isCountryIncludedInSearch).map((country: Country, index: number) => (
                    <WizardListItem
                        key={index}
                        name={country.name}
                        image={country.flag}
                        onClick={() => selectCountry(country)}
                    />
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
const InputContainer = styled.div`
    padding: 0 30px;
    border-radius: 10px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const CountriesList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default CountriesPicker;
