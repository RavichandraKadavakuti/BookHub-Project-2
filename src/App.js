import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Bookshelves from "./Components/Bookshelves";
import BookDetails from "./Components/BookDetails";
import ProtectedRoutes from "./Components/ProtectedRoutes";

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoutes exact path="/" component={Home} />
      <ProtectedRoutes exact path="/bookshelves" component={Bookshelves} />
      <ProtectedRoutes exact path="/books/:id" component={BookDetails} />
    </Switch>
  );
};

export default App;
