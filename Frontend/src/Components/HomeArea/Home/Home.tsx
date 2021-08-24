import Button from "@material-ui/core/Button";
import { NavLink, useHistory } from "react-router-dom";
import "./Home.css";
function Home(): JSX.Element {
  const history = useHistory();
  return (
    <div className="Home">
      <div className="hero">
        <h1>Welcome to Mcations</h1>
        <span>Please login or register </span>
        <span> to see awesome vacation spots</span>
        <div className="home-buttons">
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

export default Home;
