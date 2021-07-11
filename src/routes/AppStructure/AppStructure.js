import { lazy } from "react";

//components
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";


const IndexPage = lazy(() => import("../Index"));
const ErrorPage = lazy(() => import("../Error"));
const Login = lazy(() => import("../Login"));
const Signup = lazy(() => import("../Signup"));

function AppStructure() {

  return (
    <Switch>
      <PrivateRoute
        exact
        path={["/", "/home", "/profile/:user_id", "/inbox", "/inbox/:id"]}
        component={IndexPage}
      />

      <Route exact path="/error" component={ErrorPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  );
}

export default AppStructure;
