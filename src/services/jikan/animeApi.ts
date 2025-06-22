import { jikanApi } from './baseApi';
import type { JikanResponse, Anime, AnimeTopParams } from './models';

const AnimeEndpoints = {

    // animeById: '/anime/{id}',
    // animeCharacters: '/anime/{id}/characters',
    // animeStaff: '/anime/{id}/staff',
    // animeEpisodes: '/anime/{id}/episodes',
    // animeEpisodeById: '/anime/{id}/episodes/{episode}',
    // animeNews: '/anime/{id}/news',
    // animeForum: '/anime/{id}/forum',
    // animeVideos: '/anime/{id}/videos',
    // animeVideosEpisodes: '/anime/{id}/videos/episodes',
    // animePictures: '/anime/{id}/pictures',
    // animeStatistics: '/anime/{id}/statistics',
    // animeMoreInfo: '/anime/{id}/moreinfo',
    // animeRecommendations: '/anime/{id}/recommendations',
    // animeUserUpdates: '/anime/{id}/userupdates',
    // animeReviews: '/anime/{id}/reviews',
    // animeRelations: '/anime/{id}/relations',
    // animeThemes: '/anime/{id}/themes',
    // animeExternal: '/anime/{id}/external',
    // animeStreaming: '/anime/{id}/streaming',
    // animeSearch: '/anime',
    topAnime: '/top/anime',
    animeFullById: '/anime/{id}/full',
} as const;

export const animeApi = jikanApi.injectEndpoints({
    endpoints: (builder) => ({
        getTopAnime: builder.query<JikanResponse<Anime[]>, AnimeTopParams>({
            query: ({ sfw = true, limit = 10, filter = 'airing' }) => {
                return {
                    url: AnimeEndpoints.topAnime,
                    params: {
                        sfw,
                        limit,
                        filter
                    },
                };
            }
        }),

        getAnimeById: builder.query<JikanResponse<Anime>, { id: number; }>({
            query: ({ id }) => ({
                url: AnimeEndpoints.animeFullById.replace('{id}', String(id)),
            })
        }),
    }),
});

export const {
    useGetTopAnimeQuery,
    useGetAnimeByIdQuery,
} = animeApi;