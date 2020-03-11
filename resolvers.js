export const resolvers = {
    Query: {
        leagues: async (root, args, { context: { footballService } }) => {
            const leagues = await footballService.getAllLeagues();
            return leagues.map(league => ({ name: league.name, logo: league.logo }));
        },
        leaguesByCountry: async (root, args, { context: { footballService } }) => {
            const { country } = args;
            const leagues = await footballService.getLeaguesByCountry(country);
            return leagues.map(league => ({ name: league.name, logo: league.logo }));
        },
        countries: async (root, args, { context: { footballService } }) => {
            const countries = await footballService.getAllCountries();
            return countries.map(country => ({
                name: country.country,
                flag: country.flag
            }));
        }
    }
};
