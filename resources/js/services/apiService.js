import axios from "axios";
import { ERRORS } from "../constants/index.js";

const API_CONFIG = {
    TIMEOUT: 10000,
    DEFAULT_SEARCH_LIMIT: 15,
    ENDPOINTS: {
        SEARCH: "/search",
        CHART: "/chart",
    },
};

const createApiClient = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

    const client = axios.create({
        baseURL,
        timeout: API_CONFIG.TIMEOUT,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    // error handling
    client.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error("API Response Error:", error);

            if (error.response) {
                const { status, data } = error.response;

                if (status === 404) {
                    throw new Error("SERVER_CONNECTION_ERROR");
                }

                const message = data?.message || "GENERIC_ERROR";
                throw new Error(message);
            } else if (error.request) {
                throw new Error("SERVER_CONNECTION_ERROR");
            } else {
                throw new Error("GENERIC_ERROR");
            }
        }
    );

    return client;
};

const apiClient = createApiClient();

// SEARCH
const searchCities = async (
    query = "",
    limit = API_CONFIG.DEFAULT_SEARCH_LIMIT
) => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.SEARCH, {
        params: { q: query, limit },
    });
    return response.data;
};
// CHART DATA
const getChartData = async (cityNames) => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.CHART, {
        params: { cities: cityNames },
    });
    return response.data;
};

const getErrorDetails = (errorKey) => {
    return ERRORS[errorKey] || ERRORS.GENERIC_ERROR;
};

export const apiService = {
    searchCities,
    getChartData,
    getErrorDetails,
};

export { searchCities, getChartData, getErrorDetails };
