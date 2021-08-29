import { TextField, Typography } from "@material-ui/core";
import { Button, Paper } from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import { AuthActionType } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import config from "../../../Services/Config";
import notify from "../../../Services/Notify";
import realTimeService from "../../../Services/RealTimeIO";
import "./Login.css";

function Login(): JSX.Element {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsModel>({
    mode: "onBlur",
  });
  async function send(credentials: CredentialsModel) {
    try {
      console.log(credentials);
      const response = await axios.post<UserModel>(
        config.loginURL,
        credentials
      );
      delete response.data.password;
      store.dispatch({
        type: AuthActionType.UserLoggedIn,
        payload: response.data,
      });

      notify.success("You've logged in successfully!");
      history.replace("/");
    } catch (error) {
      notify.error(error);
    }
  }

  return (
    <div className="Login">
      <Paper className="login-wrapper">
        <Typography variant="h3">Login</Typography>
        <form onSubmit={handleSubmit(send)}>
          <TextField
            label="Username"
            variant="standard"
            className="TextBox"
            {...register("username", {
              required: true,
            })}
          />
          {errors.username?.type === "required" && (
            <span>Please enter your username</span>
          )}
          <TextField
            label="Password"
            variant="standard"
            type="password"
            className="TextBox"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password?.type === "required" && (
            <span>Please enter your password</span>
          )}

          <Button type="submit" variant="contained" color="primary">
            Enter
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
