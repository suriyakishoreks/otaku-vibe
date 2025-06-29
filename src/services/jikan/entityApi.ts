import { jikanApi } from './baseApi';
import type { Character, CharacterFull, CharactersSearchParams, JikanPerson, JikanPersonFull, JikanResponse, PeopleSearchParams } from './models';

const EntityEndpoints = {
    topPeople: '/top/people',
    topCharacters: '/top/characters',
    characterFullById: 'characters/{id}/full',
    personFullById: '/people/{id}/full',
    characterSearch: '/characters',
    peopleSearch: '/people'
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

        getCharacterById: builder.query<JikanResponse<CharacterFull>, { id: number; }>({
            query: ({ id }) => ({
                url: EntityEndpoints.characterFullById.replace('{id}', String(id)),
            })
        }),


        getPersonById: builder.query<JikanResponse<JikanPersonFull>, { id: number; }>({
            query: ({ id }) => ({
                url: EntityEndpoints.personFullById.replace('{id}', String(id)),
            })
        }),

        getCharacterSearch: builder.query<JikanResponse<Character[]>, CharactersSearchParams>({
            query: ({ limit, order_by, sort }) => {
                return {
                    url: EntityEndpoints.characterSearch,
                    params: {
                        limit,
                        order_by,
                        sort
                    },
                };
            }
        }),

        getPeopleSearch: builder.query<JikanResponse<JikanPerson[]>, PeopleSearchParams>({
            query: ({ limit, order_by, sort }) => {
                return {
                    url: EntityEndpoints.peopleSearch,
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
    useGetTopCharactersQuery,
    useGetTopPeopleQuery,
    useGetCharacterByIdQuery,
    useGetPersonByIdQuery,
    useGetCharacterSearchQuery,
    useGetPeopleSearchQuery
} = entityApi;