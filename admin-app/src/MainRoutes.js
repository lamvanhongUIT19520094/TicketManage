import React, { useEffect, useState } from "react";

import { Route, Switch } from "react-router-dom";
import { Home } from "./containers/Home";
import { Signin } from "./containers/Signin";
import { Signup } from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import { Routes } from "./containers/Routes";
import { Enterprise } from "./containers/Enterprise";
import { DashBoard } from "./pages/Dashboard";
import { Customer } from "./pages/Customers";

import "./asset/css/main.css"

function MainRoutes() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/routes" component={Routes} />
        <Route path="/enterprises" component={Enterprise} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />

        {/* New Route */}
        <Route path="/home" component={DashBoard} />
        <Route path="/customers" component={Customer} />

      </Switch>
    </div>
  );
}

export default MainRoutes;
