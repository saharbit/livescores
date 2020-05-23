function serializeTeam(team) {
    return { id: team.team_id, name: team.name, logo: team.logo };
}

function serializeFixtureTeam(team) {
    return { id: team.team_id, name: team.team_name, logo: team.logo };
}

export const resolvers = {
    Query: {
        countries: async (root, args, { context: { footballService } }) => {
            const countries = await footballService.getAllCountries();
            return countries.map((country) => ({
                name: country.country,
                flag: country.flag,
            }));
        },

        leaguesByCountryNames: async (root, args, { context: { footballService } }) => {
            const { countryNames } = args;

            const leagues = await footballService.getLeaguesByCountries(countryNames);
            return leagues.map((league) => ({ id: league.league_id, name: league.name, logo: league.logo }));
        },

        teamsByLeagueIds: async (root, args, { context: { footballService } }) => {
            const { leagueIds } = args;

            const teams = await footballService.getTeamsByLeagueIds(leagueIds);
            return teams.map((team) => serializeTeam(team));
        },

        upcomingFixturesByTeamIds: async (root, args, { context: { footballService } }) => {
            const { teamIds } = args;

            const fixtures = await footballService.getUpcomingFixturesByTeamIds(teamIds);
            return fixtures.map((fixture) => ({
                id: fixture.fixture_id,
                venue: fixture.venue,
                homeTeam: serializeFixtureTeam(fixture.homeTeam),
                awayTeam: serializeFixtureTeam(fixture.awayTeam),
                date: fixture.event_date,
            }));
        },
    },
};
