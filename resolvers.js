export const resolvers = {
    Query: {
        leagues: async (root, args, { context: { footballService } }) => {
            const leagues = await footballService.getAllLeagues();
            return leagues.map(league => ({ name: league.name }));
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
