import { jikanApi } from './baseApi';
import type { Character, JikanPerson, JikanResponse } from './models';

const EntityEndpoints = {
    topPeople: '/top/people',
    topCharacters: '/top/characters'
} as const;

export const entityApi = jikanApi.injectEndpoints({
    endpoints: (builder) => ({
        getTopPeople: builder.query<JikanResponse<JikanPerson[]>, { limit?: number; }>({
            query: ({ limit = 15 }) => {
                return {
                    url: EntityEndpoints.topPeople,
                    params: {
                        limit,
                    },
                };
            }
        }),

        getTopCharacters: builder.query<JikanResponse<Character[]>, { limit?: number; }>({
            query: ({ limit = 15, }) => {
                return {
                    url: EntityEndpoints.topCharacters,
                    params: {
                        limit,
                    },
                };
            }
        }),
    }),
});

export const {
    useGetTopCharactersQuery,
    useGetTopPeopleQuery
} = entityApi;