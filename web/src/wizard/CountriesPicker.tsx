import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Country } from "../../../shared/types";
import { InputField } from "@kiwicom/orbit-components";
import Search from "@kiwicom/orbit-components/lib/icons/Search";
import { useWizardDispatch } from "./WizardContext";
import WizardListItem from "./components/WizardListItem";
import WizardContinueButton from "./components/WizardContinueButton";
import { WizardContainer, WizardList } from "./components/common";

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
        <>
            <WizardContainer>
                <InputField
                    placeholder={"Search for country"}
                    value={searchTerm}
                    onChange={(event: any) => setSearchTerm(event.target.value)}
                    prefix={<Search />}
                />
                <WizardList>
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
                </WizardList>
            </WizardContainer>

            <WizardContinueButton
                link="/leagues"
                onClick={() => {
                    dispatch({ type: "setCountries", payload: selectedCountries });
                }}
                disabled={selectedCountries.length === 0}
            />
        </>
    );
};

export default CountriesPicker;
