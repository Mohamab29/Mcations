import { GitHub, Instagram, LinkedIn } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer(): JSX.Element {
  const getYear = () => new Date().getFullYear();
  const handleClick = (location: string) => {};
  return (
    <div className="Footer">
      <div className="social-media-footer">
        
        <NavLink
          className="logo"
          to={{
            pathname: "https://www.linkedin.com/in/mohamed-abomokh/",
          }}
          target="_blank"
        >
          <LinkedIn className="linkedin-logo" />
        </NavLink>
        <NavLink
          className="logo"
          to={{
            pathname: "https://www.instagram.com/mohamed097/",
          }}
          target="_blank"
        >
          <Instagram className="instagram-logo" />
        </NavLink>
        <NavLink
          className="logo"
          to={{
            pathname: "https://github.com/Mohamab29",
          }}
          target="_blank"
        >
          <GitHub className="github-logo" />
        </NavLink>
      </div>

      <p>All rights reserved to Mcations | {getYear()} ©.</p>
    </div>
  );
}

export default Footer;
