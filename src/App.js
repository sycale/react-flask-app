import React, { useState } from "react";
import { NavbarText, Navbar } from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Posts from "./Components/Posts";
import Home from "./Components/Home";

export default function App() {
  const [permission, allowPermission] = useState(false);
  function allow() {
    allowPermission(true);
  }
  return (
    <Router>
      <Navbar color="light">
        <NavbarText>
          <Link to="/">Home</Link>
        </NavbarText>
        {permission && (
          <NavbarText>
            <Link to="/posts">Posts</Link>
          </NavbarText>
        )}
      </Navbar>
      <Switch>
        <Route exact path="/posts">
          <Posts />
        </Route>
        <Route exact path="/">
          <Home allowpermission={allow} />
        </Route>
      </Switch>
    </Router>
  );
}
