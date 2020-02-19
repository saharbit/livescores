import React, { ChangeEvent, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Country from "./components/Country";
import { Country as ICountry } from "../../types";
import styled from "styled-components";
// @ts-ignore
import InputField from "@kiwicom/orbit-components/lib/InputField";
// @ts-ignore
import Button from "@kiwicom/orbit-components/lib/Button";

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
            <Button>Select leagues ></Button>

            <h1>Search countries</h1>
            <InputField
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                }
            />
            <CountriesList>
                {data.countries
                    .filter((country: ICountry) =>
                        country.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    )
                    .map((country: ICountry, index: number) => (
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

const Container = styled.div``;

const CountriesList = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #fafafa;
`;

export default CountriesPicker;
