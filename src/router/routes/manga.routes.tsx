import type { RouteObject } from 'react-router';
import { ErrorPage } from '../../pages/error-page';
import React from 'react';

const MangaPage = React.lazy(() => import('../../pages/manga-page'));
const MangaLandingPage = React.lazy(() => import('../../pages/manga-landing-page'));

export const mangaRoutes: RouteObject = {
    path: 'manga',
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            element: <MangaLandingPage />,
        },
        {
            path: ':id',
            element: <MangaPage />
        },
    ],
};