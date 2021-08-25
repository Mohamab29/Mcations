import { Button, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { Console } from "console";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import FollowerModel from "../../../Models/FollowerModel";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import "./VacationCard.css";

interface VacationCardProps {
  vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const [numOfFollowers, setNumOfFollowers] = useState(0);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      try {
        const response = await jwtAxios.get<FollowerModel[]>(
          config.getAllFollowersForVacation + props.vacation.vacationId
        );
        setNumOfFollowers(response.data.length);
      } catch (error) {
        notify.error(error);
      }
    })();
  }, [numOfFollowers]);

  const beautifyDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
  const updateFollow = async (vacationId: string) => {
    try {
      const userId = store.getState().authState.user.userId;
      const response = await jwtAxios.post<FollowerModel | boolean>(
        config.followersURL,
        {
          userId,
          vacationId,
        }
      );
      if (!response.data) {
        await jwtAxios.delete<FollowerModel | boolean>(
          config.followersURL + vacationId + "/" + userId
        );
        setNumOfFollowers(numOfFollowers - 1);
      } else {
        setNumOfFollowers(numOfFollowers + 1);
      }
    } catch (error) {
      notify.error(error);
    }
  };
  return (
    <>
      <Paper variant="elevation" className="card">
        <Button
          onClick={(e) => updateFollow(props.vacation.vacationId)}
          variant="contained"
          className="fav-icon"
        >
          Fav
        </Button>
        <Button
          onClick={(e) =>
            history.push("/vacations/details/" + props.vacation.vacationId)
          }
          variant="contained"
          className="details-icon"
        >
          Details
        </Button>
        {(numOfFollowers && (
          <Typography variant="body2" className="follower-counter">
            Followers: {numOfFollowers}
          </Typography>
        )) || <></>}
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
      </Paper>
    </>
  );
}

export default VacationCard;
