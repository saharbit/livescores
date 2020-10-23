import axios from "axios";

class FootballService {
    constructor() {
        this._axiosInstance = axios.create({
            baseURL: process.env.FOOTBALL_API_URI,
        });

        this._axiosInstance.interceptors.request.use((config) => {
            config.headers = {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": process.env.RAPIDAPI_HOST,
                "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            };
            config.params = {
                timezone: "Europe/London",
            };
            return config;
        });
    }

    async getLeaguesByCountries(countries) {
        let leagues = [];

        for (let country of countries) {
            const response = await this._axiosInstance.get(`leagues/country/${country}`);
            const countryLeagues = this.getTwoUniqueLeagues(response.data.api.leagues);
            leagues = [...leagues, ...countryLeagues];
        }

        return leagues;
    }

    getTwoUniqueLeagues(leagues) {
        let usedLeagues = {};

        return leagues
            .filter((league) => {
                if (!usedLeagues[league.name]) {
                    usedLeagues[league.name] = true;
                    return true;
                }
                return false;
            })
            .slice(0, 2);
    }

    async getAllCountries() {
        const response = await this._axiosInstance.get("countries");
        return response.data.api.countries;
    }

    async getTeamsByLeagueIds(leagueIds) {
        let teams = [];

        for (let id of leagueIds) {
            const response = await this._axiosInstance.get(`teams/league/${id}`);
            teams = [...teams, ...response.data.api.teams];
        }

        return teams;
    }

    async getUpcomingFixturesByTeamIds(teamIds) {
        const fixtures = [];
        const fixtureIds = {};

        for (let id of teamIds) {
            const response = await this._axiosInstance.get(`fixtures/team/${id}/next/10`);

            for (let fixture of response.data.api.fixtures) {
                if (!fixtureIds[fixture.fixture_id]) {
                    fixtureIds[fixture.fixture_id] = true;
                    fixtures.push(fixture);
                }
            }
        }

        return fixtures;
    }

    async getUpcomingFixturesFromTopTeams() {
        const topTeamIds = [33];
        const fixtures = [];

        for (let id of topTeamIds) {
            const response = await this._axiosInstance.get(`fixtures/team/${id}/next/10`);

            for (let fixture of response.data.api.fixtures) {
                fixtures.push(fixture);
            }
        }

        return fixtures;
    }
}

export default FootballService;
