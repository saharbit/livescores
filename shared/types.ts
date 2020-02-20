export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Country = {
   __typename?: 'Country',
  name: Scalars['String'],
  flag?: Maybe<Scalars['String']>,
};

export type League = {
   __typename?: 'League',
  name: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  leagues?: Maybe<Array<Maybe<League>>>,
  countries?: Maybe<Array<Maybe<Country>>>,
};
