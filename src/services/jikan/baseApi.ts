import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

const baseQuery = fetchBaseQuery({
    baseUrl: JIKAN_API_BASE_URL
});

const baseQueryWithRetry = retry(baseQuery, {
    maxRetries: 3,
    backoff: async () => {
        await new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }
});

export const jikanApi = createApi({
    reducerPath: 'jikanApi',
    baseQuery: baseQueryWithRetry,
    endpoints: () => ({}),
    keepUnusedDataFor: 60 * 10,
    refetchOnMountOrArgChange: 60 * 5
});

// TODO: persistence