import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";
import "./ContactUs.css";
interface ContactUsForm {
  from: string;
  title: string;
  message?: string;
}
function ContactUs(): JSX.Element {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactUsForm>();
  useEffect(() => {
    document.title = "Contact us";
    if (!store.getState().authState.user) {
      notify.error("You are not logged in.");
      return history.replace("/login");
    }
  }, []);

  function send() {
    notify.success("Your message has been sent");
    history.push("/vacations")
  }
  return (
    <div className="ContactUs">
      <Paper className="message-container">
        <Typography variant="h3" className="title">Send us a message</Typography>
        <Typography variant="body2" className="subtitle">
          At Mcations we believe that every customer is right, So please if you
          have any complaints or suggestions send us a message.
        </Typography>
        <form onSubmit={handleSubmit(send)}>
          <TextField
            label="From"
            variant="standard"
            className="TextBox"
            defaultValue={
              store.getState().authState.user.firstName +
              " " +
              store.getState().authState.user.lastName
            }
            {...register("from", {
              required: true,
            })}
          />
          {errors.from?.type === "required" && (
            <span>Please enter your full name</span>
          )}
          <TextField
            label="Title"
            variant="standard"
            className="TextBox"
            {...register("title", {
              required: true,
            })}
          />
          {errors.title?.type === "required" && (
            <span>Please provide a title</span>
          )}

          <TextField
            label="Message"
            variant="standard"
            className="TextBox"
            multiline
            rows={5}
            {...register("message", {
              required: true,
            })}
          />
          {errors.message?.type === "required" && (
            <span>Please provide a message</span>
          )}
          <Button variant="contained" type="submit">Send</Button>
        </form>
      </Paper>
    </div>
  );
}

export default ContactUs;
