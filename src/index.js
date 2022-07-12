import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import './styles/global.module.css';
import './styles/variables.module.css';

let some = [1, 2, 3].filter(item => item === 777);
console.log(some);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
