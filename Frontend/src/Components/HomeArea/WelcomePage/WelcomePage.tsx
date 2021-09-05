import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import "./WelcomePage.css";

function WelcomePage(): JSX.Element {
  const history = useHistory();
    useEffect(()=>{
        document.title="Mcations"   
    },[])
  return (
    <div className="WelcomePage welcome-bg">
      <div className="hero">
        <div className="app-logo">
          <img src={Logo} alt="app logo"></img>
        </div>
        <h1>Welcome to Mcations</h1>
        <span>Please login or register </span>
        <span> to see awesome vacation spots</span>
        <div className="hero-buttons">
          <Button variant="contained" onClick={() => history.push("/login")}>
            Login
          </Button>
          <Button variant="contained" onClick={() => history.push("/register")}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
