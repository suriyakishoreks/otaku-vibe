import { jikanApi } from './baseApi';
import type { JikanResponse, Anime, Manga, Person, Character, AnimeSearchParams, MangaSearchParams, CharacterSearchParams, PeopleSearchParams } from './models';

const SearchEndpoints = {
    anime: '/anime',
    manga: '/manga',
    people: '/people',
    characters: '/characters',
} as const;

export type SearchCategory = keyof typeof SearchEndpoints;

export const searchApi = jikanApi.injectEndpoints({
    endpoints: (builder) => ({
        getSearch: builder.query<JikanResponse<(Anime | Manga | Person | Character)[]>, { category: SearchCategory, params: AnimeSearchParams | MangaSearchParams | CharacterSearchParams | PeopleSearchParams }>({
            query: ({ category, params }) => {
                const searchParams = new URLSearchParams();
                for (const [key, value] of Object.entries(params)) {
                    if (value) {
                        searchParams.append(key, String(value));
                    }
                }
                return {
                    url: `${SearchEndpoints[category]}?${searchParams}`,
                };
            },
        }),
    }),
});

export const { useGetSearchQuery } = searchApi;
