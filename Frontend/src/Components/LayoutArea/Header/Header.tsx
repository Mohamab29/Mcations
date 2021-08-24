import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import "./Header.css";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <h1>Hello to Mcations</h1>
      <span>
        Hello{" "}
        {store.getState().authState.user.firstName +
          " " +
          store.getState().authState.user.lastName}
      </span>
      <NavLink to="/logout">Logout</NavLink>
    </div>
  );
}

export default Header;
