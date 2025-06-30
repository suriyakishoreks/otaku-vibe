import { useSearchParams } from 'react-router';
import { useGetAnimeSearchQuery, useGetCharacterSearchQuery, useGetMangaSearchQuery, useGetPeopleSearchQuery } from '../../services/jikan';
import { SearchOptions, type SearchOption } from '../../components/widgets/search-options';
import { animeGenres, animeOrder, animeRating, animeStatus, animeType, characterOrder, mangaGenres, mangaOrder, mangaStatus, mangaType, peopleOrder, sortOption, type SearchCategory } from '../../services/jikan/constants';
import { SearchResult } from '../../components/widgets/search-result';
import { formatThresholdNumber } from '../../shared/util';

function getSearchOptions(category: SearchCategory): SearchOption[] {
    switch (category) {
        case 'anime':
            return [
                { queryKey: 'type', options: animeType, placeholder: 'Type' },
                { queryKey: 'rating', options: animeRating, placeholder: 'Rating' },
                { queryKey: 'status', options: animeStatus, placeholder: 'Status' },
                { queryKey: 'genres', options: animeGenres, type: 'multi', placeholder: 'Genres' },
                { queryKey: 'genres_exclude', options: animeGenres, type: 'multi', placeholder: 'Exclude Genres' },
                { queryKey: 'order_by', options: animeOrder, placeholder: 'Order By' },
                { queryKey: 'sort', options: sortOption, placeholder: 'Sort' }
            ];
        case 'manga':
            return [
                { queryKey: 'type', options: mangaType, placeholder: 'Type' },
                { queryKey: 'status', options: mangaStatus, placeholder: 'Status' },
                { queryKey: 'genres', options: mangaGenres, type: 'multi', placeholder: 'Genres' },
                { queryKey: 'genres_exclude', options: mangaGenres, type: 'multi', placeholder: 'Exclude Genres' },
                { queryKey: 'order_by', options: mangaOrder, placeholder: 'Order By' },
                { queryKey: 'sort', options: sortOption, placeholder: 'Sort' }
            ];
        case 'characters':
            return [
                { queryKey: 'order_by', options: characterOrder, placeholder: 'Order By' },
                { queryKey: 'sort', options: sortOption, placeholder: 'Sort' }
            ];
        case 'people':
            return [
                { queryKey: 'order_by', options: peopleOrder, placeholder: 'Order By' },
                { queryKey: 'sort', options: sortOption, placeholder: 'Sort' }
            ];
        default:
            return [];
    }
}

function getSearchResults(category: SearchCategory, params: URLSearchParams) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryOptions: any = {
        q: params.get('q') ?? undefined,
        page: Number(params.get('page') ?? '1'),
        order_by: params.get('order_by') ?? undefined,
        sort: params.get('sort') ?? undefined,
    };

    if (category === 'anime') {
        queryOptions.type = params.get('type') ?? undefined;
        queryOptions.rating = params.get('rating') ?? undefined;
        queryOptions.status = params.get('status') ?? undefined;
        queryOptions.genres = params.get('genres') ?? undefined;
        queryOptions.genres_exclude = params.get('genres_exclude') ?? undefined;
    }

    if (category === 'manga') {
        queryOptions.type = params.get('type') ?? undefined;
        queryOptions.status = params.get('status') ?? undefined;
        queryOptions.genres = params.get('genres') ?? undefined;
        queryOptions.genres_exclude = params.get('genres_exclude') ?? undefined;
    }


    switch (category) {
        case 'anime':
            return (
                <SearchResult
                    useQueryHook={useGetAnimeSearchQuery}
                    options={queryOptions}
                    adapter={(data) => {
                        return {
                            pagination: data.pagination,
                            data: data.data.map((anime) => ({
                                key: `anime_${anime.mal_id}`,
                                title: anime.titles.find((title) => title.type === 'Default')?.title ?? anime.title,
                                imageUrl: anime.images.jpg.image_url,
                                navigateTo: `/anime/${anime.mal_id}`,
                                alt: anime.title,
                                ratings: anime.score?.toString(),
                                favorites: formatThresholdNumber(anime.favorites)
                            }))
                        };
                    }}
                />
            );
        case 'manga':
            return (
                <SearchResult
                    useQueryHook={useGetMangaSearchQuery}
                    options={queryOptions}
                    adapter={(data) => {
                        return {
                            pagination: data.pagination,
                            data: data.data.map((manga) => ({
                                key: `manga_${manga.mal_id}`,
                                title: manga.titles.find((title) => title.type === 'Default')?.title ?? manga.title,
                                imageUrl: manga.images.jpg.image_url,
                                navigateTo: `/manga/${manga.mal_id}`,
                                alt: manga.title,
                                ratings: manga.score?.toString(),
                                favorites: formatThresholdNumber(manga.favorites)
                            }))
                        };
                    }}
                />
            );
        case 'characters':
            return (
                <SearchResult
                    useQueryHook={useGetCharacterSearchQuery}
                    options={queryOptions}
                    adapter={(data) => {
                        return {
                            pagination: data.pagination,
                            data: data.data.map((character) => ({
                                key: `character_${character.mal_id}`,
                                title: character.name,
                                imageUrl: character.images.webp?.image_url ?? character.images.jpg.image_url,
                                navigateTo: `/character/${character.mal_id}`,
                                alt: character.name,
                                favorites: formatThresholdNumber(character.favorites)
                            }))
                        };
                    }}
                />
            );
        case 'people':
            return (
                <SearchResult
                    useQueryHook={useGetPeopleSearchQuery}
                    options={queryOptions}
                    adapter={(data) => {
                        return {
                            pagination: data.pagination,
                            data: data.data.map((person) => ({
                                key: `person_${person.mal_id}`,
                                title: person.name,
                                imageUrl: person.images.webp?.image_url ?? person.images.jpg.image_url,
                                navigateTo: `/people/${person.mal_id}`,
                                alt: person.name,
                                favorites: formatThresholdNumber(person.favorites)
                            }))
                        };
                    }}
                />
            );
        default:
            return null;
    }
}


function SearchPage() {
    const [searchParams] = useSearchParams();
    const category = (searchParams.get('category') as SearchCategory) ?? 'anime';

    return (
        <div>
            <SearchOptions
                options={getSearchOptions(category)}
                searchQueryKey={'q'}
                searchCategory={category}
            />
            {getSearchResults(category, searchParams)}
        </div>
    );
}

export default SearchPage;