import "./Home.css";
import travelBg from "../../../assets/images/home-bg.jpg";
function Home(): JSX.Element {
  return (
    <div className="Home">
      <div className="hero">
        <h1>Welcome to Mcations</h1>
        <span>Please login or register</span>
        <div className="home-buttons">
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
