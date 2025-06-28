import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useGetSearchQuery, type SearchCategory } from '../../services/jikan/searchApi';
import { useGetGenresQuery } from '../../services/jikan/genreApi';
import ImageCard from '../../components/atoms/image-card/ImageCard';
import styles from './SearchPage.module.scss';
import type { Anime } from '../../services/jikan/models/anime/anime.model';
import type { Manga } from '../../services/jikan/models/manga/manga.model';
import type { Person } from '../../services/jikan/models/person/person.model';
import type { Character } from '../../services/jikan/models/character/character.model';

type SearchResultItem = Anime | Manga | Person | Character;

function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [category, setCategory] = useState<SearchCategory>((searchParams.get('category') as SearchCategory) || 'anime');
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [type, setType] = useState(searchParams.get('type') || '');
    const [status, setStatus] = useState(searchParams.get('status') || '');
    const [rating, setRating] = useState(searchParams.get('rating') || '');
    const [orderBy, setOrderBy] = useState(searchParams.get('order_by') || 'mal_id');
    const [sort, setSort] = useState(searchParams.get('sort') || 'asc');
    const [genres, setGenres] = useState<number[]>(searchParams.getAll('genres').map(Number));
    const [genresExclude, setGenresExclude] = useState<number[]>(searchParams.getAll('genres_exclude').map(Number));

    const { data: genresData } = useGetGenresQuery({ category: category === 'manga' ? 'manga' : 'anime' });

    const { data, isLoading, isError } = useGetSearchQuery({
        category,
        params: { q: query, page, type, status, rating, order_by: orderBy, sort, genres: genres.join(','), genres_exclude: genresExclude.join(',') },
    });

    useEffect(() => {
        setSearchParams({ category, q: query, page: page.toString(), type, status, rating, order_by: orderBy, sort, genres: genres.map(String), genres_exclude: genresExclude.map(String) });
    }, [category, query, page, type, status, rating, orderBy, sort, genres, genresExclude, setSearchParams]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value as SearchCategory);
        setPage(1);
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        setPage(1);
        // Trigger re-fetch by updating searchParams
        setSearchParams({ category, q: query, page: '1', type, status, rating, order_by: orderBy, sort, genres: genres.map(String), genres_exclude: genresExclude.map(String) });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const renderFilters = () => {
        if (category === 'anime') {
            return (
                <>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="tv">TV</option>
                        <option value="movie">Movie</option>
                        <option value="ova">OVA</option>
                        <option value="special">Special</option>
                        <option value="ona">ONA</option>
                        <option value="music">Music</option>
                    </select>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">All Statuses</option>
                        <option value="airing">Airing</option>
                        <option value="complete">Complete</option>
                        <option value="upcoming">Upcoming</option>
                    </select>
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="">All Ratings</option>
                        <option value="g">G - All Ages</option>
                        <option value="pg">PG - Children</option>
                        <option value="pg13">PG-13 - Teens 13 or older</option>
                        <option value="r17">R - 17+ (violence & profanity)</option>
                        <option value="r">R+ - Mild Nudity</option>
                        <option value="rx">Rx - Hentai</option>
                    </select>
                    {/* React-select for genres */}
                    <select
                        multiple
                        value={genres.map(String)}
                        onChange={(e) => setGenres(Array.from(e.target.selectedOptions, option => Number(option.value)))}
                    >
                        {genresData?.data.map(g => (
                            <option key={g.mal_id} value={g.mal_id}>{g.name}</option>
                        ))}
                    </select>
                    <select
                        multiple
                        value={genresExclude.map(String)}
                        onChange={(e) => setGenresExclude(Array.from(e.target.selectedOptions, option => Number(option.value)))}
                    >
                        {genresData?.data.map(g => (
                            <option key={g.mal_id} value={g.mal_id}>{g.name}</option>
                        ))}
                    </select>
                </>
            );
        } else if (category === 'manga') {
            return (
                <>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="manga">Manga</option>
                        <option value="novel">Novel</option>
                        <option value="lightnovel">Light Novel</option>
                        <option value="oneshot">One-shot</option>
                        <option value="doujin">Doujinshi</option>
                        <option value="manhwa">Manhwa</option>
                        <option value="manhua">Manhua</option>
                    </select>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">All Statuses</option>
                        <option value="publishing">Publishing</option>
                        <option value="complete">Complete</option>
                        <option value="hiatus">Hiatus</option>
                        <option value="discontinued">Discontinued</option>
                        <option value="upcoming">Upcoming</option>
                    </select>
                    {/* React-select for genres */}
                    <select
                        multiple
                        value={genres.map(String)}
                        onChange={(e) => setGenres(Array.from(e.target.selectedOptions, option => Number(option.value)))}
                    >
                        {genresData?.data.map(g => (
                            <option key={g.mal_id} value={g.mal_id}>{g.name}</option>
                        ))}
                    </select>
                    <select
                        multiple
                        value={genresExclude.map(String)}
                        onChange={(e) => setGenresExclude(Array.from(e.target.selectedOptions, option => Number(option.value)))}
                    >
                        {genresData?.data.map(g => (
                            <option key={g.mal_id} value={g.mal_id}>{g.name}</option>
                        ))}
                    </select>
                </>
            );
        }
        return null;
    };

    return (
        <div className={styles.searchPage}>
            <h1>Search</h1>
            <div className={styles.filters}>
                <input type="text" value={query} onChange={handleQueryChange} placeholder="Search..." />
                <select value={category} onChange={handleCategoryChange}>
                    <option value="anime">Anime</option>
                    <option value="manga">Manga</option>
                    <option value="people">People</option>
                    <option value="characters">Characters</option>
                </select>
                {renderFilters()}
                <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                    <option value="mal_id">ID</option>
                    <option value="title">Title</option>
                    <option value="score">Score</option>
                    <option value="popularity">Popularity</option>
                    <option value="favorites">Favorites</option>
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>

            {isLoading && <div>Loading...</div>}
            {isError && <div>Error fetching results.</div>}

            {data && (
                <>
                    <div className={styles.results}>
                        {data.data.map((item: SearchResultItem) => (
                            <ImageCard
                                key={item.mal_id}
                                src={item.images.webp?.large_image_url || item.images.jpg.large_image_url}
                                alt={'title' in item ? item.title : item.name}
                                navigateTo={`/${category}/${item.mal_id}`}
                                title={'title' in item ? item.title : item.name}
                                ratings={'score' in item ? item.score : undefined}
                                favorites={item.favorites}
                            />
                        ))}
                    </div>
                    <div className={styles.pagination}>
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span>Page {page} of {data.pagination.last_visible_page}</span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={!data.pagination.has_next_page}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default SearchPage;
