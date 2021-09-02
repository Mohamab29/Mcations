import { type } from "os";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthActionType } from "../../../Redux/AuthState";

import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";
import realTimeService from "../../../Services/RealTimeIO";

function Logout(): JSX.Element {
  const history = useHistory();
  useEffect(() => {
    store.dispatch({ type: AuthActionType.UserLoggedOut });
    if (realTimeService.isConnected()) {
      realTimeService.disconnect();
    }
    notify.success("You are now logged out");
    document.title = "Mcations";
    history.replace("/welcome-page");
  });
  return null;
}

export default Logout;
