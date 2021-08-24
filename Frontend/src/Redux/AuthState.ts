import UserModel from "../Models/UserModel";

export class AuthState {
  public user: UserModel = null;
  public constructor() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.user = user;
    }
  }
}

export enum AuthActionType {
  UserRegistered = "UserRegistered",
  UserLoggedIn = "UserLoggedIn",
  UserLoggedOut = "UserLoggedOut",
}

export interface AuthAction {
  type: AuthActionType;
  payload?: any; // if user logged out then there is no payload but we still need an action to be activated
}

export function authReducer(
  currentState: AuthState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };
  switch (action.type) {
    case AuthActionType.UserRegistered:
    case AuthActionType.UserLoggedIn:
      newState.user = action.payload; //what is sent from the backend
      const userJSON = JSON.stringify(action.payload);
      localStorage.setItem("user", userJSON);
      break;
    case AuthActionType.UserLoggedOut:
      newState.user = null;
      localStorage.removeItem("user");
      break;
    default:
      break;
  }
  return newState;
}
