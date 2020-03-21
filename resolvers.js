export const resolvers = {
    Query: {
        countries: async (root, args, { context: { footballService } }) => {
            const countries = await footballService.getAllCountries();
            return countries.map(country => ({
                name: country.country,
                flag: country.flag
            }));
        },

        leaguesByCountryNames: async (root, args, { context: { footballService } }) => {
            const { countryNames } = args;

            const leagues = await footballService.getLeaguesByCountries(countryNames);
            return leagues.map(league => ({ id: league.league_id, name: league.name, logo: league.logo }));
        },

        teamsByLeagueIds: async (root, args, { context: { footballService } }) => {
            const { leagueIds } = args;

            const teams = await footballService.getTeamsByLeagueIds(leagueIds);
            return teams.map(team => ({ id: team.team_id, name: team.name, logo: team.logo }));
        }
    }
};
