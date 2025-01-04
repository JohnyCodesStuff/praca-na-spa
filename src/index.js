import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://vpxjkepbxsuofyhpuxdz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZweGprZXBieHN1b2Z5aHB1eGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMjk1NjEsImV4cCI6MjA1MTYwNTU2MX0.UxK1NEf3vML6bHfkUF2EfoWuqXy_YAxoGl7CWi4wZQs"
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <SessionContextProvider supabaseClient={supabase}>
    <App />
   </SessionContextProvider>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
