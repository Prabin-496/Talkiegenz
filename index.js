// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Chatbot from './Chatbot.jsx';
// import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Chatbot>
    <App />
  </Chatbot>
);

reportWebVitals();
