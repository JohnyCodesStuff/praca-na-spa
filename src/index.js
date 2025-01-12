import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://jauzxbqysnarrwcvsilt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphdXp4YnF5c25hcnJ3Y3ZzaWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MTQxMTgsImV4cCI6MjA1MjE5MDExOH0.557KC_poj_z9L-EyCEoRZyXiEuteX33O0seD2b1Q0aw"
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
