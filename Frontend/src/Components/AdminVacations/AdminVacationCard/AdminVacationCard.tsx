import { Button, ButtonGroup, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { beautifyDate } from "../../../Helpers/HandleDate";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import { VacationsActionType } from "../../../Redux/VacationsState";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import realTimeService from "../../../Services/RealTimeIO";
import VacationPopup from "../VacationPopup/VacationPopup";
import "./AdminVacationCard.css";

interface AdminVacationCardProps {
  vacation: VacationModel;
}

function AdminVacationCard(props: AdminVacationCardProps): JSX.Element {
  const history = useHistory();
  const [popupOpen, setPopupOpen] = useState(false);
  async function handleDeletion(vacationId: string, imageName: string) {
    try {
      const isSure = window.confirm("Are you sure?");
      if (!isSure) return;
      await jwtAxios.delete(config.vacationsURL + vacationId);
      await jwtAxios.delete(config.vacationImagesURL + imageName);
      store.dispatch({
        type: VacationsActionType.VacationDeleted,
        payload: vacationId,
      });
      realTimeService.deleteVacation(vacationId);
      notify.success("Vacation has been deleted!");
    } catch (error) {
      notify.error(error);
    }
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
          <Button onClick={(e) => setPopupOpen(true)} className="update-icon">
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
            onClick={(e) =>
              handleDeletion(
                props.vacation.vacationId,
                props.vacation.imageName
              )
            }
            className="delete-icon"
          >
            Delete
          </Button>
        </ButtonGroup>
        <VacationPopup
          popupOpen={popupOpen}
          setPopupOpen={setPopupOpen}
          vacation={props.vacation}
        />
      </Paper>
    </>
  );
}

export default AdminVacationCard;
