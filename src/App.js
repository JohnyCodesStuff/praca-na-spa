import logo from './rose_logo.svg';
import './App.css';
import react, {useState} from 'react';



const App = () => {

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
