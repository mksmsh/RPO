import { createBrowserHistory } from "history";
import { useState } from "react";
import { connect } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Account from "./components/Account";
import Artist from "./components/Artist";
import ArtistList from "./components/ArtistList";
import Country from "./components/Country";
import CountryList from "./components/CountryList";
import Home from "./components/Home";
import Login from "./components/Login";
import Museum from "./components/Museum";
import MuseumList from "./components/MuseumList";
import NavigationBar from "./components/NavigationBar";
import Painting from "./components/Painting";
import PaintingList from "./components/PaintingList";
import SideBar from "./components/SideBar";
import User from "./components/User";
import UserList from "./components/UserList";
import Utils from "./utils/Utils";

const AuthRoute = (props) => {
  let user = Utils.getUser();
  if (!user) return <Redirect to="/login" />;
  return <Route {...props} />;
};
const history = createBrowserHistory();
function App(props) {
  const [exp, setExpanded] = useState(false);
  return (
    <div className="App">
      <Router history={history}>
        <NavigationBar toggleSideBar={() => setExpanded(!exp)} />
        <div className="wrapper">
          <SideBar expanded={exp} />
          <div className="container-fluid">
            {props.error_message && (
              <div className="alert alert-danger m-1">
                {props.error_message}
              </div>
            )}
            <Switch>
              <AuthRoute path="/home" exact component={Home} />
              <AuthRoute path="/countries" exact component={CountryList} />
              <AuthRoute path="/countries/:id" component={Country} />
              <AuthRoute path="/artists" exact component={ArtistList} />
              <AuthRoute path="/artists/:id" component={Artist} />
              <AuthRoute path="/museums" exact component={MuseumList} />
              <AuthRoute path="/museums/:id" component={Museum} />
              <AuthRoute path="/paintings" exact component={PaintingList} />
              <AuthRoute path="/paintings/:id" component={Painting} />
              <AuthRoute path="/users" exact component={UserList} />
              <AuthRoute path="/users/:id" component={User} />
              <AuthRoute path="/account" exact component={Account} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
function mapStateToProps(state) {
  const { msg } = state.alert;
  return { error_message: msg };
}
export default connect(mapStateToProps)(App);
