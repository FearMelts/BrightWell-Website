import { createRoot } from 'react-dom/client';
// Update the import path if App.tsx is located elsewhere, e.g.:
// import App from './components/App';
// Otherwise, ensure App.tsx exists in the same directory:
import App from './App';
import './shadcn.css';

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
