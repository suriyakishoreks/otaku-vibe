import type { Statistics } from '../common';

export interface AnimeStatistics extends Statistics {
	watching: number;
	plan_to_watch: number;
}
