import { jikanApi } from './baseApi';
import type { Character, CharacterFull, JikanPerson, JikanPersonFull, JikanResponse } from './models';

const EntityEndpoints = {
    topPeople: '/top/people',
    topCharacters: '/top/characters',
    characterFullById: 'characters/{id}/full',
    personFullById: '/people/{id}/full'
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
    }),
});

export const {
    useGetTopCharactersQuery,
    useGetTopPeopleQuery,
    useGetCharacterByIdQuery,
    useGetPersonByIdQuery
} = entityApi;