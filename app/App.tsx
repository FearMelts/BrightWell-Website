/**
 * Main application component with routing and theme provider
 * Sets up the application structure with theme support
 */
import { HashRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from './components/ThemeProvider'
import HomePage from './pages/Home'

/**
 * Root App component with theme provider and routing
 */
export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="brightwell-theme">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}