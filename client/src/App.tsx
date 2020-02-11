import React from "react";
import "./App.css";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const FETCH_LEAGUES = gql`
  {
    leagues {
      name
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(FETCH_LEAGUES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <header className="App-header">
        {data.leagues.map((league: any) => `${league.name}, `)}
      </header>
    </div>
  );
};

export default App;
