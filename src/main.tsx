import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { preload } from 'react-dom';
import './styles/main.scss';
import { store, persistor } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router';
import router from './router';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeUpdater from './shared/side-effect-handlers/ThemeUpdater';
import { Loader } from './layouts/loader';

preload(`${import.meta.env.BASE_URL}font/outfit-variable.woff2`, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <ThemeUpdater />
        <RouterProvider router={router} />
      </PersistGate>
    </ReduxProvider>
  </StrictMode>,
);


// TODO: Ad integration

// TODO: check opera mobile favicon issue

// TODO: CSS class name refactoring

// TODO: view transition API






