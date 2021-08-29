import { EventTracker } from "@devexpress/dx-react-chart";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Title,
  Tooltip,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Paper, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import "./ShowGraph.css";
interface FollowedVacations {
  vacationId: string;
  destination: string;
  followerNumber: number;
}

function ShowGraph(): JSX.Element {
  const [followedVacations, setFollowedVacations] =
    useState<FollowedVacations[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await jwtAxios.get<FollowedVacations[]>(config.getAllFollowedVacations);
        setFollowedVacations(response.data);
      } catch (error) {
        notify.error(error);
      }
    })();
  }, [followedVacations]);

  return (
    <div className="ShowGraph">
      <Typography variant="h2">Show followed vacation graph</Typography>
      <Paper variant="elevation" className="graph-container">
        <Chart data={followedVacations}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="followerNumber" argumentField="destination" />
          <Title text="Followed Vacations" />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Paper>
    </div>
  );
}

export default ShowGraph;
