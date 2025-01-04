import logo from './rose_logo.svg';
import './App.css';
import react, {useState} from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';



const App = () => {

  const session = useSession(); //tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase


  const [text,setText] = useState("Yes")


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Will You be my Valentine?
        </p>
        <button className="button" onClick={() => setText("Woohoooooooo!!!!!!!")}>
          {text}
        </button>
        <button className="button">
          No
        </button >
      </header>
    </div>
  );
}

export default App;
