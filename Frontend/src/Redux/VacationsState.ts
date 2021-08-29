import VacationModel from "../Models/VacationModel";

class VacationsState {
  public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
  VacationsDownloaded = "VacationsDownloaded",
  VacationAdded = "VacationAdded",
  VacationDeleted = "VacationDeleted",
  VacationUpdated = "VacationUpdated",
}

export interface VacationsAction {
  type: VacationsActionType;
  payload: any;
}

export function vacationsReducer(
  currentState: VacationsState = new VacationsState(),
  action: VacationsAction
): VacationsState {
  const newState = { ...currentState };
  switch (action.type) {
    case VacationsActionType.VacationsDownloaded:
      newState.vacations = action.payload;
      break;
    case VacationsActionType.VacationAdded:
      newState.vacations.push(action.payload);
      break;
    case VacationsActionType.VacationUpdated:
      const index = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload.vacationId
      );
      newState.vacations[index] = action.payload;
      break;
    case VacationsActionType.VacationDeleted:
      const vacationIndex = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload
      );
      newState.vacations.splice(vacationIndex, 1);
      break;
  }
  return newState;
}
