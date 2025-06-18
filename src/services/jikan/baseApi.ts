import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { JIKAN_API_BASE_URL } from '../../shared/constants';

const baseQuery = fetchBaseQuery({
    baseUrl: JIKAN_API_BASE_URL
});

// A custom baseQuery that retries failed requests
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const baseApi = createApi({
    reducerPath: 'jikanApi',
    baseQuery: baseQueryWithRetry,
    endpoints: () => ({}),
});