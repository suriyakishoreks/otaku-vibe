import type { SortOptions } from './search-params.model';

export interface PeopleSearchParams {
    page?: number;
    limit?: number;
    q?: string;
    order_by?: PeopleSearchOrder;
    sort?: SortOptions;
    letter?: string;
}

export type PeopleSearchOrder = 'mal_id' | 'name' | 'favorites' | 'birthday';
