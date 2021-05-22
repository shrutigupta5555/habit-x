import "./App.scss";
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding/Onboarding";
import Nav from "./components/Nav";
import Register from './components/Register'
import Login from './components/Login'
import {auth} from './utils/firebase';
import Audio from './pages/Audio';

function App() {

  const [user, setuser] = useState(null)

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(
      userAuth => {
        const user = {
          uid : userAuth.uid,
          email: userAuth.email
        }

        if(userAuth) {
          console.log(userAuth);
          setuser(user)
        }else{
          setuser(null)
        }
      }
    )

    return unsubscribe;
    
  }, [])

  return (
    <Router>
      <div>
        <Nav />
        
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route exact path="/">
            <Onboarding user={user}/>
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route  path="/login">
            <Login />
          </Route>
          <Route  path="/audio">
            <Audio />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
