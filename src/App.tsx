/**
 * Main application component with routing and theme provider
 * ThemeProvider MUST wrap the entire router and all routes.
 */
import { HashRouter, Route, Routes } from 'react-router';
import HomePage from '../app/Pages/Home';
import { ThemeProvider } from '../components/ThemeProvider';

/**
 * Root App component with theme provider and routing
 */
export default function App() {
  // ThemeProvider wraps the router and all routes
  return (
    <ThemeProvider defaultTheme="system" storageKey="brightwell-theme">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
