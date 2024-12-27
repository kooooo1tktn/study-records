import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import './index.css';
import TodoComponent from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoComponent />
  </StrictMode>,
)
