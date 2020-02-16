import FootballService from "./services/FootballService";

const footballService = new FootballService();

export const resolvers = {
  Query: {
    hello: async (root, args) => "world",
    leagues: async (root, args) => {
      const leagues = await footballService.getAllLeagues();
      return leagues.map(league => ({ name: league.name }));
    },
    countries: async (root, args) => {
      const countries = await footballService.getAllCountries();
      return countries.map(country => ({ name: country.country, flag: country.flag }));
    }
  }
};
