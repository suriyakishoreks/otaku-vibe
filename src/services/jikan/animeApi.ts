import { jikanApi } from './baseApi';
import type { Anime, AnimeCharacter, AnimeStaff } from './models';

const AnimeEndpoints = {
    animeFullById: '/anime/{id}/full',
    animeById: '/anime/{id}',
    animeCharacters: '/anime/{id}/characters',
    animeStaff: '/anime/{id}/staff',
    animeEpisodes: '/anime/{id}/episodes',
    animeEpisodeById: '/anime/{id}/episodes/{episode}',
    animeNews: '/anime/{id}/news',
    animeForum: '/anime/{id}/forum',
    animeVideos: '/anime/{id}/videos',
    animeVideosEpisodes: '/anime/{id}/videos/episodes',
    animePictures: '/anime/{id}/pictures',
    animeStatistics: '/anime/{id}/statistics',
    animeMoreInfo: '/anime/{id}/moreinfo',
    animeRecommendations: '/anime/{id}/recommendations',
    animeUserUpdates: '/anime/{id}/userupdates',
    animeReviews: '/anime/{id}/reviews',
    animeRelations: '/anime/{id}/relations',
    animeThemes: '/anime/{id}/themes',
    animeExternal: '/anime/{id}/external',
    animeStreaming: '/anime/{id}/streaming',
    animeSearch: '/anime'
} as const;

export const animeApi = jikanApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnimeFullById: builder.query<Anime, number>({
            // TODO: Create utility to replace {id} in the endpoint
            query: (id) => AnimeEndpoints.animeFullById.replace('{id}', id.toString()),
        }),

        getAnimeById: builder.query<Anime, number>({
            query: (id) => AnimeEndpoints.animeById.replace('{id}', id.toString()),
        }),

        getAnimeCharacters: builder.query<AnimeCharacter[], number>({
            query: (id) => AnimeEndpoints.animeCharacters.replace('{id}', id.toString()),
        }),

        getAnimeStaff: builder.query<AnimeStaff[], number>({
            query: (id) => AnimeEndpoints.animeStaff.replace('{id}', id.toString()),
        }),
    }),
});

export const {
    useGetAnimeByIdQuery,
    useGetAnimeFullByIdQuery,
    useGetAnimeCharactersQuery,
    useGetAnimeStaffQuery
} = animeApi;