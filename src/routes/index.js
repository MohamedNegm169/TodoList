import React from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import Board from "../components/Board";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/" component={Board} />
        <Route>
          <Redirect to="/" />
        </Route>
      </div>
    </Router>
  );
};

export default AppRouter;
