import type { RouteObject } from 'react-router';
import { CharacterPage } from '../../pages/character-page';
import { PersonPage } from '../../pages/person-page';
import { ErrorPage } from '../../pages/error-page';

export const entityRoutes: RouteObject = {
    path: '',
    errorElement: <ErrorPage />,
    children: [
        {
            path: 'character/:id',
            element: <CharacterPage />,
        },
        {
            path: 'person/:id',
            element: <PersonPage />
        },
    ],
};