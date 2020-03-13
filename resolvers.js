export const resolvers = {
    Query: {
        leagues: async (root, args, { context: { footballService } }) => {
            const leagues = await footballService.getAllLeagues();
            return leagues.map(league => ({ name: league.name, logo: league.logo }));
        },
        leaguesByCountries: async (root, args, { context: { footballService } }) => {
            const { countries } = args;

            const leagues = await footballService.getLeaguesByCountries(countries);
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
