export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  countries?: Maybe<Array<Maybe<Country>>>;
  leaguesByCountryNames?: Maybe<Array<Maybe<League>>>;
  teamsByLeagueIds?: Maybe<Array<Maybe<Team>>>;
  upcomingFixturesByTeamIds?: Maybe<Array<Maybe<Fixture>>>;
  upcomingFixturesFromTopLeagues?: Maybe<Array<Maybe<Fixture>>>;
};


export type QueryLeaguesByCountryNamesArgs = {
  countryNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryTeamsByLeagueIdsArgs = {
  leagueIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type QueryUpcomingFixturesByTeamIdsArgs = {
  teamIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type Country = {
  __typename?: 'Country';
  name: Scalars['String'];
  flag?: Maybe<Scalars['String']>;
};

export type League = {
  __typename?: 'League';
  id: Scalars['Int'];
  name: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['Int'];
  name: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
};

export type Fixture = {
  __typename?: 'Fixture';
  id: Scalars['Int'];
  date: Scalars['String'];
  venue?: Maybe<Scalars['String']>;
  homeTeam: Team;
  awayTeam: Team;
  league: League;
};
