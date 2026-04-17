/* eslint-disable no-unused-vars */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { makeServer } from './server/server';

makeServer();

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);
