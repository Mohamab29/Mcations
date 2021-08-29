import { io, Socket } from "socket.io-client";
import VacationModel from "../Models/VacationModel";
import store from "../Redux/Store";
import { VacationsActionType } from "../Redux/VacationsState";

// handling real time updates, adds and deletion of vacations
class RealTimeService {
  private socket: Socket;
  public connect(): void {
    this.socket = io("http://localhost:3001");
  }
  public vacationAdded(updateState: Function) {
    this.socket.on("vacation-added", (vacation) => updateState(vacation));
  }
  public addVacation(vacation: VacationModel) {
    this.socket.emit("add-new-vacation", vacation);
  }
  public vacationDeleted(updateState: Function) {
    this.socket.on("vacation-deleted", (vacationId:string) => updateState(vacationId));
  }
  public deleteVacation(vacationId: string) {
    this.socket.emit("delete-vacation", vacationId);
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}

const realTimeService = new RealTimeService();

export default realTimeService;
