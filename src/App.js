import React from "react";
import "./App.css";
import Profile from "./components/profile/profile.component";
import SignIn from "./components/signin/signin.component";
import SignUp from "./components/signup/signup.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./utility/privateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
