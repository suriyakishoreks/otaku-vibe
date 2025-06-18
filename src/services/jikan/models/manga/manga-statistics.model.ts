import type { Statistics } from '../common';

export interface MangaStatistics extends Statistics {
	reading: number;
	plan_to_read: number;
}
