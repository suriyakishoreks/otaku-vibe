import type { JikanNamedResource } from '../common';

export interface Genre extends JikanNamedResource {
	mal_id: number;
	count: number;
}
