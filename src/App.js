import logo from './rose_logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Will You be my Valentine?
        </p>
        <button>
          Yes
        </button>
        <button>
          No
        </button>
      </header>
    </div>
  );
}

export default App;
