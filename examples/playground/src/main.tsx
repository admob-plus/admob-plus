import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/nprogress/styles.css';

import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {NavigationProgress} from '@mantine/nprogress';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Router} from 'wouter';
import App from './App.tsx';
import useHashLocation from './hooks/useHashLocation';

export function Root() {
  return (
    <React.StrictMode>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        <NavigationProgress />
        <Router hook={useHashLocation}>
          <App />
        </Router>
      </MantineProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
