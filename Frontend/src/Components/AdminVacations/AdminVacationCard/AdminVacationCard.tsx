import { Button, ButtonGroup, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { beautifyDate } from "../../../Helpers/HandleDate";
import VacationModel from "../../../Models/VacationModel";
import config from "../../../Services/Config";
import "./AdminVacationCard.css";

interface AdminVacationCardProps {
  vacation: VacationModel;
}

function AdminVacationCard(props: AdminVacationCardProps): JSX.Element {
  const history = useHistory();
  async function updateVacation(vacationId: string) {
    console.log();
  }
  
  return (
    <>
      <Paper variant="elevation" className="admin-card">


        <Typography variant="h6" className="card-title">
          {props.vacation.destination}
        </Typography>

        <img
          src={config.vacationImagesURL + props.vacation.imageName}
          alt="card image"
          loading="lazy"
        ></img>

        <div className="card-footer">
          <Typography variant="body2">
            From: {beautifyDate(props.vacation.startDate)}
          </Typography>
          <Typography variant="body2" className="description">
            To: {beautifyDate(props.vacation.endDate)}
          </Typography>
          <Typography variant="body2" className="description">
            Price: $ {props.vacation.price}
          </Typography>
        </div>
        <ButtonGroup variant="contained" className="card-btn-group">
          <Button
            onClick={(e) => updateVacation(props.vacation.vacationId)}
            className="update-icon"
          >
            Update
          </Button>
          <Button
            onClick={(e) =>
              history.push("/vacations/details/" + props.vacation.vacationId)
            }
            className="details-icon"
          >
            Details
          </Button>
          <Button
            onClick={(e) => updateVacation(props.vacation.vacationId)}
            className="delete-icon"
          >
            Delete
          </Button>
          </ButtonGroup>
      </Paper>
    </>
  );
}

export default AdminVacationCard;
