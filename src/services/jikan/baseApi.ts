import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

const baseQuery = fetchBaseQuery({
    baseUrl: JIKAN_API_BASE_URL
});

// A custom baseQuery that retries failed requests
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const jikanApi = createApi({
    reducerPath: 'jikanApi',
    baseQuery: baseQueryWithRetry,
    endpoints: () => ({}),
});