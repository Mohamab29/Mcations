import { Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FollowerModel from "../../../Models/FollowerModel";
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
    (async () => {
      try {
        if (!store.getState().authState.user) {
          notify.error("You are not logged in.");
          return history.replace("/login");
        }
        if (store.getState().vacationsState.vacations.length === 0) {
          const response = await jwtAxios.get<VacationModel[]>(
            config.vacationsURL
          );
          const sortedVacations = await sortVacations(response.data);
          store.dispatch({
            type: VacationsActionType.VacationsDownloaded,
            payload: sortedVacations,
          });
        }
        setVacations(store.getState().vacationsState.vacations);
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
  }, [vacations]);
  async function sortVacations(vacations: VacationModel[]) {
    try {
      const followedVacations: VacationModel[] = [];
      const notFollowedVacations: VacationModel[] = [];
      const response = await jwtAxios.get<FollowerModel[]>(
        config.getAllFollowedVacations + store.getState().authState.user.userId
      );
      if (!response.data.length) {
        return vacations;
      }
      const followedByUser = response.data.map((f) => f.vacationId);
      for (const vacation of vacations) {
        if (followedByUser.includes(vacation.vacationId)) {
          followedVacations.push(vacation);
        } else {
          notFollowedVacations.push(vacation);
        }
      }
      console.log(followedByUser);
      console.log(notFollowedVacations);
      return followedVacations.concat(notFollowedVacations);
    } catch (error) {
      alert(error.message);
    }
  }
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
