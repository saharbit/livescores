import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Country } from "../../../shared/types";
import { Loading } from "@kiwicom/orbit-components";
import { SET_COUNTRIES, useWizardDispatch } from "../context/WizardContext";
import WizardListItem from "./components/WizardListItem";
import WizardContinueButton from "./components/WizardContinueButton";
import WizardContainer from "./components/WizardContainer";
import WizardList from "./components/WizardList";
import WizardSearchInput from "./components/WizardSearchInput";

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

    return (
        <WizardContainer>
            <WizardSearchInput
                onChange={setSearchTerm}
                value={searchTerm}
                disabled={loading}
                placeholder={"Search for country"}
            />
            {loading ? (
                <Loading />
            ) : (
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
            )}
            <WizardContinueButton
                link="/leagues"
                onClick={() => {
                    dispatch({ type: SET_COUNTRIES, payload: selectedCountries });
                }}
                disabled={selectedCountries.length === 0}
            />
        </WizardContainer>
    );
};

export default CountriesPicker;
