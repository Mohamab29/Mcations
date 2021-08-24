import { Redirect, Route, Switch } from "react-router";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";

function Routing(): JSX.Element {
    return (
        <>
		<Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/logout" component={Logout} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/home" component={Home} exact />

        <Redirect from="/" to="/home" exact />

        </Switch>	
        </>
    );
}

export default Routing;
