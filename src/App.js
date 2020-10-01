import React, { useEffect, useState } from "react";
import { NavbarText } from "reactstrap";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Posts from "./Components/Posts.jsx";

function Home() {
  return <div>Hello</div>;
}

export default function App() {
  return (
    <Router>
      <Navbar color="light">
        <NavbarText>
          <Link to="/">Home</Link>
        </NavbarText>
        <NavbarText>
          <Link to="/posts">Posts</Link>
        </NavbarText>
        <NavbarText>
          <Link to="/loginPage">Login</Link>
        </NavbarText>
        <NavbarText>
          <Link to="/registration">Registration</Link>
        </NavbarText>
      </Navbar>

      <Switch>
        <Route exact path="/posts">
          <Posts />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/loginPage"></Route>
        <Route exact path="/registration"></Route>
      </Switch>
    </Router>
  );
}

