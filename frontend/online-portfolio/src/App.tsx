import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <Router>
      <div>
        <div>
          <Switch>
            <Route exact path="/">
              <Profile />
            </Route>
          </Switch>
        </div>
      </div>

    </Router>
  );
}

export default App;
