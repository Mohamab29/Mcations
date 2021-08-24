import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { vacationsReducer } from "./VacationsState";

const reducers = combineReducers({
  authState: authReducer,
  vacationsState: vacationsReducer,
});

const store = createStore(reducers);

export default store;
