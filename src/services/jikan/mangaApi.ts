import { jikanApi } from './baseApi';
import type { Genre, JikanResponse, Manga, MangaSearchParams, MangaTopParams } from './models';

const MangaEndpoints = {
    topManga: '/top/manga',
    mangaFullById: '/manga/{id}/full',
    mangaGenres: 'genres/manga',
    mangaSearch: '/manga',
} as const;

export const mangaApi = jikanApi.injectEndpoints({
    endpoints: (builder) => ({
        getTopManga: builder.query<JikanResponse<Manga[]>, MangaTopParams>({
            query: ({ limit = 15, filter = 'bypopularity', type }) => {
                return {
                    url: MangaEndpoints.topManga,
                    params: {
                        limit,
                        filter,
                        type
                    },
                };
            }
        }),

        getMangaById: builder.query<JikanResponse<Manga>, { id: number; }>({
            query: ({ id }) => ({
                url: MangaEndpoints.mangaFullById.replace('{id}', String(id)),
            })
        }),

        getMangaGenres: builder.query<JikanResponse<Genre[]>, void>({
            query: () => {
                return {
                    url: MangaEndpoints.mangaGenres
                };
            }
        }),

        getMangaSearch: builder.query<JikanResponse<Manga[]>, MangaSearchParams>({
            query: ({ limit, order_by, sort }) => {
                return {
                    url: MangaEndpoints.mangaSearch,
                    params: {
                        limit,
                        order_by,
                        sort
                    },
                };
            }
        }),
    }),
});

export const {
    useGetTopMangaQuery,
    useGetMangaByIdQuery,
    useGetMangaGenresQuery,
    useGetMangaSearchQuery
} = mangaApi;