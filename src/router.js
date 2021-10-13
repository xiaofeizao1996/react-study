import React from "react";
import { router } from "dva";
import Home from "./pages/home/Home";

const { Switch, Router, Route } = router;

const DvaRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default DvaRouter;
