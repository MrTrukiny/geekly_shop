import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { router } from './routes.tsx';
import { store, persistor } from './state/store.ts';

import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PayPalScriptProvider deferLoading={true} options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
            <RouterProvider router={router} />
          </PayPalScriptProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
