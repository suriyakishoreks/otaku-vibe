import type { RouteObject } from 'react-router';
import { ErrorPage } from '../../pages/error-page';
import React from 'react';

const CharacterPage = React.lazy(() => import('../../pages/character-page'));
const PersonPage = React.lazy(() => import('../../pages/person-page'));


export const entityRoutes: RouteObject = {
    path: '',
    errorElement: <ErrorPage />,
    children: [
        {
            path: 'character/:id',
            element: <CharacterPage />,
        },
        {
            path: 'people/:id',
            element: <PersonPage />
        },
    ],
};