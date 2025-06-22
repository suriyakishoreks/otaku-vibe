import type { AnimeType } from '../anime';
import type { MangaType } from '../manga';

type TopFilter = 'upcoming' | 'bypopularity' | 'favorite';

export type TopAnimeFilter = 'airing' | TopFilter;

export type TopMangaFilter = 'publishing' | TopFilter;

export interface JikanTopParams {
	page?: number;
	limit?: number;
}

/**
 * QueryParams used in **getTopAnime** call
 *
 * See also: [Jikan API Documentation](https://docs.api.jikan.moe/#tag/top/operation/getTopAnime)
 */
export interface AnimeTopParams extends JikanTopParams {
	type?: AnimeType;
	filter?: TopAnimeFilter;
	sfw?: boolean;
}

/**
 * QueryParams used in **getTopManga** call
 *
 * See also: [Jikan API Documentation](https://docs.api.jikan.moe/#tag/top/operation/getTopManga)
 */
export interface MangaTopParams extends JikanTopParams {
	type?: MangaType;
	filter?: TopMangaFilter;
}
