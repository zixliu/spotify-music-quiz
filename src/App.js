import logo from './logo.svg';
import './App.css';
import Login from './Login';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <h1>Hello</h1>
    //   </header>
    // </div>
    // {!token && <Login />}
      // {token && <Player spotify={s} />}
    <div className="app">
      <Login />
    </div>
  );
}

export default App;
