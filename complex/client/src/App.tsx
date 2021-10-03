import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Fib } from './fib';
import { OtherPage } from './other-page';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">Fibonacci Home</Link>
          <Link to="/other-page">Other Page</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route exact path="/other-page" component={OtherPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
