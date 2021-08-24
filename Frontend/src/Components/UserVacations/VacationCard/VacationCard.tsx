import { Paper, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import config from "../../../Services/Config";
import notify from "../../../Services/Notify";
import "./VacationCard.css";

interface VacationCardProps {
  vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const beautifyDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
  return (
    <>
      <Paper variant="elevation" className="card">
        <div className="icon">Fav</div>
        <img
          src={config.vacationImagesURL + props.vacation.imageName}
          alt="card image"
          className="card-image"
          loading="lazy"
        ></img>
        <Typography variant="h3" className="card-title">
          {props.vacation.destination}
        </Typography>
        <div className="card-body">
          <Typography variant="body1" className="description">
            {props.vacation.description}
          </Typography>
        </div>
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
