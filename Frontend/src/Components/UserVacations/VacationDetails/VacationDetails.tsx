import { Button, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, RouteComponentProps, useHistory } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { AuthActionType } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import LoadingGIF from "../../SharedArea/LoadingGIF/LoadingGIF";
import "./VacationDetails.css";
interface RouteParams {
  uuid: string;
}
interface VacationDetailsProps extends RouteComponentProps<RouteParams> {}
function VacationDetails(props: VacationDetailsProps): JSX.Element {
  const history = useHistory();
  const [vacation, setVacation] = useState<VacationModel>();
  useEffect(() => {
    (async () => {
      try {
        const uuidRegex = new RegExp(
          /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        );
        const uuid = props.match.params.uuid;
        if (!uuidRegex.test(uuid)) {
          return history.push("/page-not-found");
        }
        if (!store.getState().authState.user) {
          notify.error("You are not logged in.");
          return history.replace("/login");
        }

        const response = await jwtAxios.get<VacationModel>(
          config.vacationsURL + uuid
        );
        setVacation(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          notify.error(error);

          if (error.response.status === 401) {
            history.replace("/register");
          } else if (error.response.status === 403) {
            history.replace("/login");
            store.dispatch({
              type: AuthActionType.UserLoggedOut,
            });
          }
        } else {
          notify.error(error);
        }
      }
    })();
  }, []);
  const beautifyDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
  return (
    <div className="VacationDetails">
      <NavLink
        to="/vacations"
        className="return-link"        
      >
        Back
      </NavLink>
      {!vacation && <LoadingGIF />}
      {vacation && (
        <Paper variant="elevation" className="details-card">
          <Typography variant="h4" className="card-title">
            {vacation.destination}
          </Typography>

          <img
            src={config.vacationImagesURL + vacation.imageName}
            alt="card image"
            loading="lazy"
            className="card-image"
          ></img>
          <Typography variant="body2" className="description">
            {vacation.description}
          </Typography>
          <div className="card-footer">
            <Typography variant="body2">
              From: {beautifyDate(vacation.startDate)}
            </Typography>
            <Typography variant="body2" className="description">
              To: {beautifyDate(vacation.endDate)}
            </Typography>
            <Typography variant="body2" className="description">
              Price: $ {vacation.price}
            </Typography>
          </div>
        </Paper>
      )}
    </div>
  );
}

export default VacationDetails;
