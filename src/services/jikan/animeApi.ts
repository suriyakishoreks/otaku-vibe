import { jikanApi } from './baseApi';
import type { JikanResponse, Anime, AnimeTopParams, SeasonNowParams, JikanSeasonsParams, AnimeSearchParams } from './models';

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
    topAnime: '/top/anime',
    animeFullById: '/anime/{id}/full',
    animeSeasonsNow: '/seasons/now',
    animeSeasonsUpcoming: '/seasons/upcoming',
    animeSearch: '/anime',
    recentAnimeRecommendations: '/recommendations/anime'
} as const;

export const animeApi = jikanApi.injectEndpoints({
    endpoints: (builder) => ({
        getTopAnime: builder.query<JikanResponse<Anime[]>, AnimeTopParams>({
            query: ({ sfw = true, limit = 15, filter = 'bypopularity' }) => {
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

        getAnimeSeasonsNow: builder.query<JikanResponse<Anime[]>, SeasonNowParams>({
            query: ({ limit = 15, }) => {
                return {
                    url: AnimeEndpoints.animeSeasonsNow,
                    params: {
                        limit,
                    },
                };
            }
        }),

        getAnimeSeasonsUpcoming: builder.query<JikanResponse<Anime[]>, JikanSeasonsParams>({
            query: ({ limit = 15 }) => {
                return {
                    url: AnimeEndpoints.animeSeasonsUpcoming,
                    params: {
                        limit
                    },
                };
            }
        }),

        getAnimeSearch: builder.query<JikanResponse<Anime[]>, AnimeSearchParams>({
            query: ({ limit, order_by, sort }) => {
                return {
                    url: AnimeEndpoints.animeSearch,
                    params: {
                        limit,
                        order_by,
                        sort
                    },
                };
            }
        }),

        getRecentAnimeRecommendations: builder.query<JikanResponse<Anime[]>, { page?: number; }>({
            query: ({ page = 1 }) => {
                return {
                    url: AnimeEndpoints.recentAnimeRecommendations,
                    params: {
                        page
                    },
                };
            }
        }),
    }),
});

export const {
    useGetTopAnimeQuery,
    useGetAnimeByIdQuery,
    useGetAnimeSeasonsNowQuery,
    useGetAnimeSeasonsUpcomingQuery,
    useGetAnimeSearchQuery,
    useGetRecentAnimeRecommendationsQuery
} = animeApi;