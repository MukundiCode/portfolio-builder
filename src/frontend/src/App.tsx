import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './pages/profile/Profile';
import HomePage from './pages/home/HomePage';
import AuthProvider from './context/AuthProvider';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div>
        <div>
          <NavBar></NavBar>
          <Switch>
            <Route path="/:username">
              <Profile />
            </Route>
            <Route exact path="/">
              <HomePage></HomePage>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
