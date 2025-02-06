import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './Store.js';
import { MantineProvider } from '@mantine/core'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS> 
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
