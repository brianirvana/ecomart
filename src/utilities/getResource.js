import axios from "axios";

export const getResource = async (url, token) => {
    // Validate input early so axios doesn't throw a confusing error when url is undefined
    if (!url) {
        console.error('getResource called with undefined URL. Did you set VITE_PRODUCT / VITE_CATEGORY in your .env?');
        throw new Error('Request URL is undefined. Check your VITE_ environment variables (e.g. VITE_PRODUCT).');
    }

    try {
        const config = {
            headers: {}
        };

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "An unexpected error occurred.");
    }
}
