import { IconButton, Paper, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { beautifyDate } from "../../../Helpers/HandleDate";
import FollowerModel from "../../../Models/FollowerModel";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import InfoIcon from "@material-ui/icons/Info";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./VacationCard.css";

interface VacationCardProps {
  vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const [numOfFollowers, setNumOfFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const userId = store.getState().authState.user.userId;

  const history = useHistory();
  useEffect(() => {
    (async () => {
      try {
        const response = await jwtAxios.get<FollowerModel[]>(
          config.getAllFollowersForVacation + props.vacation.vacationId
        );
        const found = response.data.find((v) => v.userId === userId);
        if (found) {
          setIsFollowing(true);
        }
        setNumOfFollowers(response.data.length);
      } catch (error) {
        notify.error(error);
      }
    })();
  }, [props.vacation.vacationId]);

  const updateFollow = async (vacationId: string) => {
    try {
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
        setIsFollowing(false);
      } else {
        setNumOfFollowers(numOfFollowers + 1);
        setIsFollowing(true);
      }
    } catch (error) {
      notify.error(error);
    }
  };
  return (
    <>
      <Paper variant="elevation" className="card">
        <IconButton
          onClick={(e) => updateFollow(props.vacation.vacationId)}
          className="fav-icon"
        >
          {isFollowing ? (
            <FavoriteIcon color="secondary" />
          ) : (
            <FavoriteBorderIcon color="secondary" />
          )}
        </IconButton>
        <IconButton
          onClick={(e) =>
            history.push("/vacations/details/" + props.vacation.vacationId)
          }
          className="details-icon"
        >
          <InfoIcon />
        </IconButton>
        {(numOfFollowers && (
          <span className="followers-badge">{numOfFollowers}</span>
        )) || <></>}
        <Typography variant="h6" className="card-title">
          {props.vacation.destination}
        </Typography>

        <img
          src={config.vacationImagesURL + props.vacation.imageName}
          alt=""
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
