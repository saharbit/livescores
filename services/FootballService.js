import axios from "axios";

class FootballService {
  constructor() {
    this._axiosInstance = axios.create({
      baseURL: "https://api-football-v1.p.rapidapi.com/v2/"
    });

    this._axiosInstance.interceptors.request.use(config => {
      config.headers = {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.RAPIDAPI_KEY
      };
      return config;
    });
  }

  async getAllLeagues() {
    const response = await this._axiosInstance.get("leagues/country/england");
    return response.data.api.leagues.slice(0, 2);
  }

  async getAllCountries() {
    const response = await this._axiosInstance.get("countries");
    return response.data.api.countries;
  }
}

export default FootballService;
