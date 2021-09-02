import { io, Socket } from "socket.io-client";
import VacationModel from "../Models/VacationModel";

// handling real time updates, adds and deletion of vacations
class RealTimeService {
  private socket: Socket;

  public connect(): void {
    if (this.socket?.connected) {
      return;
    }
    this.socket = io("http://localhost:3001");
  }
  public isConnected(): Boolean {
    return this.socket ? (this.socket.connected ? true : false) : false;
  }
  public vacationAdded(updateState: Function) {
    this.socket.on("vacation-added", (vacation) => updateState(vacation));
  }
  public addVacation(vacation: VacationModel) {
    this.socket.emit("add-new-vacation", vacation);
  }
  public vacationUpdated(updateState: Function) {
    this.socket.on("vacation-updated", (vacation) => updateState(vacation));
  }
  public updateVacation(vacation: VacationModel) {
    this.socket.emit("update-vacation", vacation);
  }
  public vacationDeleted(updateState: Function) {
    this.socket.on("vacation-deleted", (vacationId: string) =>
      updateState(vacationId)
    );
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
