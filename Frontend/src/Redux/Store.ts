import { combineReducers, createStore, StoreEnhancer } from "redux";
import { authReducer } from "./AuthState";
import { vacationsReducer } from "./VacationsState";

const reducers = combineReducers({
  authState: authReducer,
  vacationsState: vacationsReducer,
});
// for debugging purposes
type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>;
};

const isReduxDevtoolsExtensionExist = (
  arg: Window | WindowWithDevTools
): arg is WindowWithDevTools => {
  return "__REDUX_DEVTOOLS_EXTENSION__" in arg;
};
const store = createStore(
  reducers,
  isReduxDevtoolsExtensionExist(window)
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

export default store;
