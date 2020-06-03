import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./routes/privateRoute";
import TodoList from './pages/TodoList';

function App(props) {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" component={TodoList} />
      </Switch>
    </Router>
  );
}

export default App;
