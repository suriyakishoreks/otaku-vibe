import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { preload } from 'react-dom';
import './styles/main.scss';
import { store, persistor } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router';
import router from './router';
import { PersistGate } from 'redux-persist/integration/react';

preload(`${import.meta.env.BASE_URL}font/outfit-variable.woff2`, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      {/* //TODO: properly loading anim */}
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </PersistGate>
    </ReduxProvider>
  </StrictMode>,
);

// TODO: SPA, opti

// TODO: Logging Service - tracking, errors, performance

// TODO: SEO

// TODO: Ad integration





