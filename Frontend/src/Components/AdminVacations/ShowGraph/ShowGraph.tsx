import { EventTracker } from "@devexpress/dx-react-chart";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Title,
  Tooltip,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Paper } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import store from "../../../Redux/Store";
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
    const history = useHistory()
  const [followedVacations, setFollowedVacations] = useState<
    FollowedVacations[]
  >([]);
  useEffect(() => {
    (async () => {
      try {
        document.title = "Followers Graph";
        if (!store.getState().authState.user) {
          notify.error("You are not logged in.");
          return history.replace("/login");
        } else if (!store.getState().authState.user.isAdmin) {
          notify.error("You are not authorized to enter here!");
          return history.replace("/vacations");
        }
        const response = await jwtAxios.get<FollowedVacations[]>(
          config.getAllFollowedVacations
        );
        setFollowedVacations(response.data);
      } catch (error) {
        notify.error(error);
      }
    })();
  }, [followedVacations]);
  const getWindowSize = () => {
    return window.innerWidth;
  };
  return (
    <div className="ShowGraph">
      <Paper variant="elevation" className="graph-container">
        <Chart data={followedVacations}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            valueField="followerNumber"
            argumentField="destination"
            barWidth={0.5}
          />
          <Title text="Followed Vacations" />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Paper>
    </div>
  );
}

export default ShowGraph;
