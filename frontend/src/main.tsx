import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Provider } from 'react-redux';//Importing thhe provider for state management
import { store } from './store/index.ts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3949ab',
      dark: '#1a237e',
      light: '#5c6bc0',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
    },
  },
});

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>

        </ThemeProvider>
      </Provider>
        
      {/* <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ThemeProvider> */}
    </React.StrictMode>
  );
}