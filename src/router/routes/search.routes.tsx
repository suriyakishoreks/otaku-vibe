import { type RouteObject } from 'react-router';
import { SearchPage } from '../../pages/search-page';
import { ErrorPage } from '../../pages/error-page';

export const searchRoutes: RouteObject = {
    path: 'search',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
};