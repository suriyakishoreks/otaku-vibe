import { type RouteObject } from 'react-router';
import { ErrorPage } from '../../pages/error-page';
import React from 'react';

const SearchPage = React.lazy(() => import('../../pages/search-page'));


export const searchRoutes: RouteObject = {
    path: 'search',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
};