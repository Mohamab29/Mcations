import { Typography } from "@material-ui/core";
import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import sortVacations from "../../../Helpers/SortVacations";
import VacationModel from "../../../Models/VacationModel";
import { AuthActionType } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import { VacationsActionType } from "../../../Redux/VacationsState";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import realTimeService from "../../../Services/RealTimeIO";
import LoadingGIF from "../../SharedArea/LoadingGIF/LoadingGIF";
import VacationCard from "../VacationCard/VacationCard";
import "./ShowVacationsUser.css";

function ShowVacationsUser(): JSX.Element {
  const history = useHistory();
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  // socket io functions for handling the events
  const vacationHasBeenAdded = (vacation: VacationModel) => {
    store.dispatch({
      type: VacationsActionType.VacationAdded,
      payload: vacation,
    });
  };
  const vacationHasBeenUpdated = (vacation: VacationModel) => {
    store.dispatch({
      type: VacationsActionType.VacationUpdated,
      payload: vacation,
    });
  };
  const vacationHasBeenDeleted = (vacationId: string) => {
    store.dispatch({
      type: VacationsActionType.VacationDeleted,
      payload: vacationId,
    });
  };
  useEffect(() => {
    (async () => {
      try {
        document.title = "Available vacations";
        if (
          !store.getState().authState.user ||
          _.isEmpty(store.getState().authState.user)
        ) {
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
        // establishing a connection with the server
        if (!realTimeService.isConnected()) {
            realTimeService.connect();
          // listening to add vacation event
          realTimeService.vacationAdded(vacationHasBeenAdded);
          // listening to delete vacation event
          realTimeService.vacationDeleted(vacationHasBeenDeleted);
          // listening to update vacation event
          realTimeService.vacationUpdated(vacationHasBeenUpdated);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          notify.error(error);
          console.log(error);
          if (error.response.status === 401) {
            return history.replace("/");
          } else if (error.response.status === 403) {
            store.dispatch({
              type: AuthActionType.UserLoggedOut,
            });
            return history.replace("/login");
          }
        } else {
          notify.error(error);
        }
      }
    })();
    const unsubscribe = store.subscribe(() => {
      setVacations([...store.getState().vacationsState.vacations]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="ShowVacationsUser">
      {(vacations.length === 0 && <LoadingGIF />) || (
        <>
          <Typography variant="h2" className="title">
            The available vacations
          </Typography>
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
