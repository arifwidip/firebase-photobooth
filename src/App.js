import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import firebase from 'firebase/app';
import Home from './pages/Home';
import Photobooth from './pages/Photobooth';
import SignUp from './pages/SignUp';
import { AuthProvider } from './contexts/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCry2Zej_lOTLgX_8FjSkMRht0mIvtciUk",
  authDomain: "photobooth-7b681.firebaseapp.com",
  projectId: "photobooth-7b681",
  storageBucket: "photobooth-7b681.appspot.com",
  messagingSenderId: "637218009539",
  appId: "1:637218009539:web:9120a634b54c04064fcd76"
}
firebase.initializeApp(firebaseConfig)

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/photobooth">Photobooth</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/photobooth">
              <Photobooth />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
