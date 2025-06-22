import { jikanApi } from './baseApi';
import type { JikanResponse, Manga, MangaTopParams } from './models';

const MangaEndpoints = {
    topManga: '/top/manga',
    mangaFullById: '/manga/{id}/full',
} as const;

export const mangaApi = jikanApi.injectEndpoints({
    endpoints: (builder) => ({
        getTopManga: builder.query<JikanResponse<Manga[]>, { limit?: number, filter?: MangaTopParams; }>({
            query: ({ limit = 10, filter = 'publishing' }) => {
                return {
                    url: MangaEndpoints.topManga,
                    params: {
                        limit,
                        filter
                    },
                };
            }
        }),

        getMangaById: builder.query<JikanResponse<Manga>, { id: number; }>({
            query: ({ id }) => ({
                url: MangaEndpoints.mangaFullById.replace('{id}', String(id)),
            })
        }),
    }),
});

export const {
    useGetTopMangaQuery,
    useGetMangaByIdQuery
} = mangaApi;