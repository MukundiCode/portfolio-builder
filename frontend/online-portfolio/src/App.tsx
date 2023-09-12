import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './pages/profile/Profile';
import HomePage from './pages/home/HomePage';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <Router>
      <div>
        <div>
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
