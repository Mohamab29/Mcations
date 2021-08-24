import { Redirect, Route, Switch } from "react-router";
import Home from "../../HomeArea/Home/Home";

function Routing(): JSX.Element {
    return (
        <>
		<Switch>
        <Route path="/home" component={Home} exact />

        <Redirect from="/" to="/home" exact />

        </Switch>	
        </>
    );
}

export default Routing;
