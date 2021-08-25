import { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import ShowVacationsAdmin from "../../AdminVacations/ShowVacationsAdmin/ShowVacationsAdmin";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import ShowVacationsUser from "../../UserVacations/ShowVacationsUser/ShowVacationsUser";
import VacationDetails from "../../UserVacations/VacationDetails/VacationDetails";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
  const [user, setUser] = useState<UserModel>(store.getState().authState.user);

  return (
    <>
      <Switch>
        {(user?.isAdmin && (
          <Route path="/vacations" component={ShowVacationsAdmin} exact />
        )) || <Route path="/vacations" component={ShowVacationsUser} exact />}
        {user && (
          <Route
            path="/vacations/details/:uuid"
            component={VacationDetails}
            exact
          />
        )}
        <Route path="/login" component={Login} exact />
        <Route path="/logout" component={Logout} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/home" component={Home} exact />
        {(!user && <Redirect from="/" to="/home" exact />) || (
          <Redirect from="/" to="/vacations" exact />
        )}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

export default Routing;
