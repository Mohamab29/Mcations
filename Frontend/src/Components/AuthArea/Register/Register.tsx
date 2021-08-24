import { Button, Paper, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { AuthActionType } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import config from "../../../Services/Config";
import notify from "../../../Services/Notify";
import "./Register.css";

function Register(): JSX.Element {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>({ mode: "onBlur" });
  async function send(user: UserModel) {
    try {
      const response = await axios.post<UserModel>(config.registerURL, user);
      delete response.data.password;
      store.dispatch({
        type: AuthActionType.UserRegistered,
        payload: response.data,
      });
      notify.success("You've been registered.");
      history.replace("/");
    } catch (error) {
      notify.error(error);
    }
  }
  return (
    <div className="Register">
      <Paper className="register-wrapper">
        <Typography variant="h3">Register</Typography>
        <form onSubmit={handleSubmit(send)}>
          <TextField
            label="First name"
            variant="standard"
            className="TextBox"
            {...register("firstName", {
              required: true,
              pattern: /^[a-zA-Z]{2,30}$/,
              minLength: 2,
              maxLength: 30,
            })}
          />
          {errors.firstName?.type === "required" && (
            <span>Please enter your first name</span>
          )}
          {errors.firstName?.type === "pattern" && (
            <span>
              A first name should only include small and capital letters
            </span>
          )}
          {errors.firstName?.type === "minLength" && (
            <span>A first name should be at least 2 letters long</span>
          )}
          {errors.firstName?.type === "maxLength" && (
            <span>A first name should be at most 30 letters long</span>
          )}
          <TextField
            label="Last name"
            variant="standard"
            className="TextBox"
            {...register("lastName", {
              required: true,
              pattern: /^[a-zA-Z]{2,40}$/,
              minLength: 2,
              maxLength: 40,
            })}
          />
          {errors.lastName?.type === "required" && (
            <span>Please enter your last name</span>
          )}
          {errors.lastName?.type === "pattern" && (
            <span>
              A last name should only include small and capital letters
            </span>
          )}
          {errors.lastName?.type === "minLength" && (
            <span>A last name should be at least 2 letters long</span>
          )}
          {errors.lastName?.type === "maxLength" && (
            <span>A last name should be at most 40 letters long</span>
          )}
          <TextField
            label="Username"
            variant="standard"
            className="TextBox"
            {...register("username", {
              required: true,
              pattern: /^[0-9a-zA-Z]{4,30}$/,
              minLength: 4,
              maxLength: 30,
            })}
          />
          {errors.username?.type === "required" && (
            <span>Please enter a username</span>
          )}
          {errors.username?.type === "pattern" && (
            <span>
              A username should only include small,capital letters and/or
              numbers
            </span>
          )}
          {errors.username?.type === "minLength" && (
            <span>A username should be at least 4 letters long</span>
          )}
          {errors.username?.type === "maxLength" && (
            <span>A username should be at most 30 letters long</span>
          )}
          <TextField
            label="Password"
            variant="standard"
            className="TextBox"
            {...register("password", {
              required: true,
              pattern:
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
              minLength: 4,
              maxLength: 30,
            })}
          />
          {errors.password?.type === "required" && (
            <span>Please enter a password</span>
          )}
          {errors.password?.type === "pattern" && (
            <span>
              A password should only include at lest one small and capital
              letters and numbers and symbol
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span>A password should be at least 8 characters long</span>
          )}
          {errors.password?.type === "maxLength" && (
            <span>A password should be at most 30 characters long</span>
          )}

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Register;
