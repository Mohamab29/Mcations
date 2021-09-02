import _ from "lodash";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import ShowGraph from "../../AdminVacations/ShowGraph/ShowGraph";
import ShowVacationsAdmin from "../../AdminVacations/ShowVacationsAdmin/ShowVacationsAdmin";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import WelcomePage from "../../HomeArea/WelcomePage/WelcomePage";
import ContactUs from "../../UserVacations/ContactUs/ContactUs";
import ShowVacationsUser from "../../UserVacations/ShowVacationsUser/ShowVacationsUser";
import VacationDetails from "../../UserVacations/VacationDetails/VacationDetails";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
  const [user, setUser] = useState<UserModel>(store.getState().authState.user);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUser(store.getState().authState.user);
    });
    return () => unsubscribe();
  }, [user]);
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
        <Route path="/graph" component={ShowGraph} exact />
        <Route path="/contact-us" component={ContactUs} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/logout" component={Logout} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/welcome-page" component={WelcomePage} exact />
        {((_.isEmpty(user) || !user) && (
          <Redirect from="/" to="/welcome-page" exact />
        )) || <Redirect from="/" to="/vacations" exact />}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

export default Routing;
