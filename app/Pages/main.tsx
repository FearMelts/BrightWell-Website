import { createRoot } from 'react-dom/client';
// Try one of these import paths for App:
import App from '../App'; // If App.tsx is one level up
// import App from './App'; // If App.tsx is in the same folder
// import App from '../../App'; // If App.tsx is two levels up
import './shadcn.css';

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
