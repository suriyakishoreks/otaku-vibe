import { jikanApi } from './baseApi';
import type { JikanResponse, JikanResource } from './models';

const GenreEndpoints = {
    anime: '/genres/anime',
    manga: '/genres/manga',
} as const;

export type GenreCategory = keyof typeof GenreEndpoints;

export const genreApi = jikanApi.injectEndpoints({
    endpoints: (builder) => ({
        getGenres: builder.query<JikanResponse<JikanResource[]>, { category: GenreCategory }>({
            query: ({ category }) => ({
                url: GenreEndpoints[category],
            }),
        }),
    }),
});

export const { useGetGenresQuery } = genreApi;
