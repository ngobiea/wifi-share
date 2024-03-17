import { createRoot } from 'react-dom/client';
import '../../../dist/output.css';
import App from './App';
import { store } from './store';
import { ThemeProvider } from '@material-tailwind/react';
import { Provider } from 'react-redux';
import { AppProvider } from './context/AppContext';
import { StrictMode } from 'react';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <AppProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AppProvider>
    </Provider>
  </StrictMode>
);
