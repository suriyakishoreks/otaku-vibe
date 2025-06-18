import type { AnimeType } from '../anime';

export interface JikanSeasonsParams {
	page?: number;
	limit?: number;
	filter?: AnimeType;
}

/**
 * QueryParams used in **getSeasonNow** call
 */
export type SeasonNowParams = Omit<JikanSeasonsParams, 'filter'>;
