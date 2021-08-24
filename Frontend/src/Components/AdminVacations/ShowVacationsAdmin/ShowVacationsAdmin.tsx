import { Typography } from "@material-ui/core";
import "./ShowVacationsAdmin.css";

function ShowVacationsAdmin(): JSX.Element {
  return (
    <div className="ShowVacationsAdmin">
      <Typography variant="h2">The available vacations</Typography>
      <div className="card-container"></div>
    </div>
  );
}

export default ShowVacationsAdmin;
