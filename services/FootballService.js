import axios from "axios";

class FootballService {
    constructor() {
        this._axios = axios.create({
            baseURL: "https://api-football-v1.p.rapidapi.com/v2/"
        });

        this._axios.interceptors.request.use(config => {
            config.headers = {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": process.env.RAPIDAPI_HOST,
                "x-rapidapi-key": process.env.RAPIDAPI_KEY
            };
            return config;
        });
    }

    async getLeaguesByCountries(countries) {
        let leagues = [];

        for (let i = 0; i < countries.length; i++) {
            const response = await this._axios.get(`leagues/country/${countries[i]}`);
            leagues = [...leagues, ...response.data.api.leagues.slice(0, 2)];
        }

        return leagues;
    }

    async getAllLeagues() {
        const response = await this._axios.get(`leagues`);
        return response.data.api.leagues;
    }

    async getAllCountries() {
        const response = await this._axios.get("countries");
        return response.data.api.countries;
    }
}

export default FootballService;
