import { Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { AuthActionType } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import { VacationsActionType } from "../../../Redux/VacationsState";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import LoadingGIF from "../../SharedArea/LoadingGIF/LoadingGIF";
import VacationCard from "../VacationCard/VacationCard";
import "./ShowVacationsUser.css";

function ShowVacationsUser(): JSX.Element {
  const history = useHistory();
  const [vacations, setVacations] = useState<VacationModel[]>(
    store.getState().vacationsState.vacations
  );

  useEffect(() => {
    jwtAxios
      .get<VacationModel[]>(config.vacationsURL)
      .then((response) => {
        store.dispatch({
          type: VacationsActionType.VacationsDownloaded,
          payload: response.data,
        });
        setVacations(store.getState().vacationsState.vacations);
      })
      .catch((error) => {
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
      });
  }, [vacations]);
  return (
    <div className="ShowVacationsUser">
      {(vacations.length === 0 && <LoadingGIF />) || (
        <>
          <Typography variant="h2">The available vacations</Typography>
          <div className="cards">
            {vacations.map((v, index) => (
              <VacationCard key={index} vacation={v} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ShowVacationsUser;
