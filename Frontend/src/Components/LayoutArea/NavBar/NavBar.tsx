import { NavLink } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import "./NavBar.css";
import { useState } from "react";

function NavBar(): JSX.Element {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <nav className="NavBar">
      <div className="navbar-container">
        <NavLink to="/" exact className="nav-logo">
          <img src={Logo} alt="app-logo" />
        </NavLink>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/vacations"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Vacations
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/graph"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Graph
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              About us
            </NavLink>
          </li>
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {click ? <CloseIcon className="icon" /> : <MenuIcon className="icon" />}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
