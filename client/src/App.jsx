import './App.css';
import {Fragment, useEffect} from "react";
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import CreateProfile from "./components/profile-form/CreateProfile"
import PrivateRoute from "./components/routing/PrivateRoute"
import Main from "./components/pages/Main"
import EditProfile from "./components/profile-form/EditProfile"
import AddExperience from "./components/profile-form/AddExperience"
import AddEducation from "./components/profile-form/AddEducation"
import Profile from "./components/profile/Profile"
import Profiles from "./components/profiles/Profiles"
import Post from "./components/post/Post"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
//Redux
import {Provider} from "react-redux"
import store from "./store"
import Alert from "./components/layout/Alert"
import {loadUser} from "./actions/auth"
import setAuthToken from './utils/setAuthToken';



const App = () => {
  useEffect(()=>{
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
    <Router>
    <Fragment>

      <section>
      <Alert/>
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <PrivateRoute exact path="/" component={Main}/>
          <PrivateRoute exact path="/profiles/:search" component={Profiles}/>
          <PrivateRoute exact path="/profile/:id" component={Profile}/>
          <PrivateRoute exact path="/posts/:id" component={Post}/>
          <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
          <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
          <PrivateRoute exact path="/add-education" component={AddEducation}/>
          <PrivateRoute exact path="/add-experience" component={AddExperience}/>
          
        </Switch>
        </section>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
