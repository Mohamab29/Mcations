import axios from "axios";
import store from "../Redux/Store";

const jwtAxios = axios.create();

// adding the token to header
jwtAxios.interceptors.request.use((request) => {
  if (store.getState().authState) {
    request.headers = {
      authorization: "Bearer " + store.getState().authState.user.token,
    };
  }
  return request;
});

export default jwtAxios;
