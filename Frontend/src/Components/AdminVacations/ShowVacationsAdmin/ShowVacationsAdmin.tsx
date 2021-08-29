import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import sortVacations from "../../../Helpers/SortVacations";
import VacationModel from "../../../Models/VacationModel";
import { AuthActionType } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import { VacationsActionType } from "../../../Redux/VacationsState";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import LoadingGIF from "../../SharedArea/LoadingGIF/LoadingGIF";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import VacationPopup from "../VacationPopup/VacationPopup";
import AddIcon from "@material-ui/icons/Add";
import "./ShowVacationsAdmin.css";
import realTimeService from "../../../Services/RealTimeIO";

function ShowVacationsAdmin(): JSX.Element {
  const history = useHistory();
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!store.getState().authState.user) {
          notify.error("You are not logged in.");
          return history.replace("/login");
        } else if (!store.getState().authState.user.isAdmin) {
          notify.error("You are not authorized to enter here!");
          return history.replace("/home");
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
        // listening to add vacation event
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          notify.error(error);
          if (error.response.status === 401) {
            return history.replace("/register");
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
    <div className="ShowVacationsAdmin">
      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        className="add-vacation"
        onClick={() => {
          setPopupOpen(true);
        }}
      >
        Add Vacation
      </Button>
      {(!vacations.length && <LoadingGIF />) || (
        <>
          <Typography variant="h2">
            The available vacations in the database
          </Typography>
          <div className="card-container">
            {vacations.map((v, index) => (
              <AdminVacationCard key={index} vacation={v} />
            ))}
          </div>
        </>
      )}
      <VacationPopup popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
    </div>
  );
}

export default ShowVacationsAdmin;
