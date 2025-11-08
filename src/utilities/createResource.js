import axios from "axios";

export const createResource = async (url, data, token) => {
    // Validate URL early to avoid making requests to the dev server origin when url is undefined
    if (!url) {
        console.error('createResource called with undefined URL. Did you set VITE_SHOP or the correct VITE_ variable in your .env?');
        throw new Error('Request URL is undefined. Check your VITE_ environment variables (e.g. VITE_SHOP).');
    }

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        const response = await axios.post(url, data, config);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "An unexpected error occurred.");
    }
}