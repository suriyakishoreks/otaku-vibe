import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import styles from './SearchPage.module.scss';
import { useGetAnimeSearchQuery, useGetCharacterSearchQuery, useGetMangaSearchQuery, useGetPeopleSearchQuery } from '../../services/jikan';
import { SearchOptions, type SearchOption } from '../../components/widgets/search-options';
import { animeGenres, animeOrder, animeRating, animeStatus, animeType, characterOrder, mangaGenres, mangaOrder, mangaStatus, mangaType, peopleOrder, sortOption } from '../../services/jikan/constants';
import { SearchResult } from '../../components/widgets/search-result';
import { formatThresholdNumber } from '../../shared/util';

type SearchCategory = 'anime' | 'manga' | 'people' | 'characters';

function getSearchOptions(category: SearchCategory): SearchOption[] {
    switch (category) {
        case 'anime':
            return [
                { queryKey: 'type', options: animeType },
                { queryKey: 'rating', options: animeRating },
                { queryKey: 'status', options: animeStatus },
                { queryKey: 'genres', options: animeGenres },
                { queryKey: 'order_by', options: animeOrder },
                { queryKey: 'sort', options: sortOption }
            ];
        case 'manga':
            return [
                { queryKey: 'type', options: mangaType },
                { queryKey: 'status', options: mangaStatus },
                { queryKey: 'genres', options: mangaGenres },
                { queryKey: 'order_by', options: mangaOrder },
                { queryKey: 'sort', options: sortOption }
            ];
        case 'characters':
            return [
                { queryKey: 'order_by', options: characterOrder },
                { queryKey: 'sort', options: sortOption }
            ];
        case 'people':
            return [
                { queryKey: 'order_by', options: peopleOrder },
                { queryKey: 'sort', options: sortOption }
            ];
        default:
            return [];
    }
}

function getSearchResults(category: SearchCategory) {
    switch (category) {
        case 'anime':
            return (
                <SearchResult
                    useQueryHook={useGetAnimeSearchQuery}
                    options={{}}
                    adapter={(data) => {
                        return {
                            pagination: data.pagination,
                            data: data.data.map((anime) => ({
                                key: anime.mal_id.toString(),
                                title: anime.titles.find((title) => title.type === 'Default')?.title ?? anime.title,
                                imageUrl: anime.images.jpg.image_url,
                                navigateTo: `/anime/${anime.mal_id}?`,
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
                    options={{}}
                    adapter={(data) => {
                        return {
                            pagination: data.pagination,
                            data: data.data.map((manga) => ({
                                key: manga.mal_id.toString(),
                                title: manga.titles.find((title) => title.type === 'Default')?.title ?? manga.title,
                                imageUrl: manga.images.jpg.image_url,
                                navigateTo: `/manga/${manga.mal_id}?`,
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
                    options={{}}
                    adapter={(data) => {
                        return {
                            pagination: data.pagination,
                            data: data.data.map((character) => ({
                                key: character.mal_id.toString(),
                                title: character.name,
                                imageUrl: character.images.webp?.image_url ?? character.images.jpg.image_url,
                                navigateTo: `/character/${character.mal_id}?`,
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
                    options={{}}
                    adapter={(data) => {
                        return {
                            pagination: data.pagination,
                            data: data.data.map((person) => ({
                                key: person.mal_id.toString(),
                                title: person.name,
                                imageUrl: person.images.webp?.image_url ?? person.images.jpg.image_url,
                                navigateTo: `/people/${person.mal_id}?`,
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
    const [searchParams, setSearchParams] = useSearchParams();

    const [category, setCategory] = useState<SearchCategory>((searchParams.get('category') as SearchCategory) ?? 'anime');

    useEffect(() => {
        setSearchParams(prevSearchParams => {
            const newSearchParams = new URLSearchParams(prevSearchParams);
            newSearchParams.set('category', category);
            return newSearchParams;
        }, { replace: true });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    return (
        <div className={styles.searchPage}>
            <SearchOptions
                options={getSearchOptions(category)}
                searchQueryKey={'q'}
            />

            {getSearchResults(category)}

        </div>
    );
}

export default SearchPage;
