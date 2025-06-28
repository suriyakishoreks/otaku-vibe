import { type RouteObject } from 'react-router';
import { SearchPage } from '../../pages/search-page';

export const searchRoutes: RouteObject = {
    path: 'search',
    element: <SearchPage />,
};