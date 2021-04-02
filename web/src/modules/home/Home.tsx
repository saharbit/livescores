import React from "react";
import { useWizardState } from "../../context/WizardContext";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "@kiwicom/orbit-components/lib";
import FixturesList from "./components/FixturesList";
import { GET_DEFAULT_FIXTURES, GET_FIXTURES } from "./queries";
import { getFixturesByDate } from "./utils";

const Home = () => {
    const { teams } = useWizardState();
    const { loading, error, data } = useQuery(
        teams?.length ? GET_FIXTURES : GET_DEFAULT_FIXTURES,
        { ...(teams?.length ? { variables: { teamIds: teams } } : {}) }
    );

    if (error) {
        return <div>Error</div>;
    }

    const fixtures = teams?.length
        ? data?.upcomingFixturesByTeamIds
        : data?.upcomingFixturesFromTopLeagues;

    return loading ? (
        <Loading />
    ) : (
        <FixturesList fixtures={getFixturesByDate(fixtures)} />
    );
};

export default Home;
