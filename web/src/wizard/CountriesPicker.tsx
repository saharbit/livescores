import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Country } from "../../../shared/types";
import styled from "styled-components";
import { InputField } from "@kiwicom/orbit-components";
// @ts-ignore
import Search from "@kiwicom/orbit-components/lib/icons/Search";
import { useWizardDispatch } from "./WizardContext";
import WizardListItem from "./components/WizardListItem";
import WizardContinueButton from "./components/WizardContinueButton";

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
        setSelectedCountries(selectedCountries.filter((x) => x.name !== country.name));
    }

    function selectCountry(country: Country) {
        setSelectedCountries([...selectedCountries, country]);
        setSearchTerm("");
    }

    function isCountryIncludedInSearch(country: Country) {
        return country.name.toLowerCase().includes(searchTerm.toLowerCase());
    }

    function isCountrySelected(country: Country) {
        return !!selectedCountries.find((x) => x.name === country.name);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Container>
            <HeaderContainer>
                <Header>
                    <span>Choose your countries</span>
                    <SkipButton>Skip</SkipButton>
                </Header>
                <InputField
                    placeholder={"Search for country"}
                    value={searchTerm}
                    onChange={(event: any) => setSearchTerm(event.target.value)}
                    prefix={<Search />}
                />
            </HeaderContainer>
            <CountriesList>
                {data.countries
                    .filter(isCountryIncludedInSearch)
                    .sort((country: Country) => (isCountrySelected(country) ? -1 : 1))
                    .map((country: Country, index: number) => {
                        const isSelected = isCountrySelected(country);

                        return (
                            <WizardListItem
                                key={index}
                                name={country.name}
                                image={country.flag}
                                isSelected={isSelected}
                                onClick={() => (isSelected ? removeCountry(country) : selectCountry(country))}
                            />
                        );
                    })}
            </CountriesList>
            <WizardContinueButton
                link="/leagues"
                onClick={() => {
                    dispatch({ type: "setCountries", payload: selectedCountries });
                }}
                disabled={selectedCountries.length === 0}
            />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    max-height: 100vh;
`;

const HeaderContainer = styled.div`
    border-radius: 10px;
    margin-bottom: 10px;
`;

const SkipButton = styled.span`
    font-size: 10px;
    opacity: 0.7;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const CountriesList = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
`;

export default CountriesPicker;
