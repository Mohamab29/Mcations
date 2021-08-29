import {
  Button,
  FormControl,
  Input,
  InputLabel,
  withStyles,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { SyntheticEvent, useRef } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { checkStartEndDate } from "../../../Helpers/HandleDate";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import { VacationsActionType } from "../../../Redux/VacationsState";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import realTimeService from "../../../Services/RealTimeIO";
import "./UpdateVacation.css";
interface UpdateVacationProps {
  vacation?: VacationModel;
  popupOpen: boolean;
  setPopupOpen: Function;
}

function UpdateVacation(props: UpdateVacationProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VacationModel>({ mode: "onBlur" });
  const [vacation, setVacation] = useState<VacationModel>(props.vacation);

  async function send(vacation: VacationModel) {
    try {
      const isSure = window.confirm("Are you sure you want to update this vacation?");
      if (!isSure) return;
      const checked = checkStartEndDate(vacation.startDate, vacation.endDate);
      if (!checked.answer) {
        return notify.error(checked.message);
      }
      // we put the upload the image so we put it in form data
      if (vacation.image.item(0)) {
        const formData = new FormData();
        formData.append("image", vacation.image.item(0));
        const imageResponse = await jwtAxios.post<string>(
          config.vacationImagesURL,
          formData
        );
        vacation.imageName = imageResponse.data;
      }
      // here we send all the form to the back end after successfully adding an image
      const response = await jwtAxios.patch<VacationModel>(
        config.vacationsURL + props.vacation.vacationId,
        vacation
      );

      store.dispatch({
        type: VacationsActionType.VacationUpdated,
        payload: response.data,
      });
      realTimeService.updateVacation(response.data);
      notify.success("vacation updated successfully.");
      props.setPopupOpen(false);
    } catch (error) {
      notify.error(error);
    }
  }
  const ValidationTextField = withStyles({
    root: {
      "& input:valid + fieldset": {
        borderColor: "green",
        borderWidth: 2,
      },
      "& input:invalid + fieldset": {
        borderColor: "red",
        borderWidth: 2,
      },
      "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        padding: "4px !important", // override inline-style
      },
    },
  })(TextField);

  return (
    <div className="UpdateVacation">
      <form onSubmit={handleSubmit(send)}>
        <FormControl className="TextBox">
          <InputLabel htmlFor="component-destination">Destination</InputLabel>
          <Input
            id="component-destination"
            defaultValue={vacation.destination}
            {...register("destination", {
              minLength: 4,
              maxLength: 60,
            })}
          />
        </FormControl>

        {errors.destination?.type === "minLength" && (
          <span>A destination should be at least 4 characters</span>
        )}
        {errors.destination?.type === "maxLength" && (
          <span>A destination should be at most 60 characters</span>
        )}
        <FormControl className="TextBox">
          <InputLabel htmlFor="component-description">Description</InputLabel>
          <Input
            id="component-description"
            defaultValue={vacation.description}
            {...register("description", {
              minLength: 10,
              maxLength: 1500,
            })}
          />
        </FormControl>

        {errors.description?.type === "minLength" && (
          <span>A description should be at least 10 characters</span>
        )}
        {errors.description?.type === "maxLength" && (
          <span>A description should be at most 1500 characters</span>
        )}
        {/* <FormControl className="TextBox">
          <InputLabel htmlFor="component-price">Price</InputLabel>
          <Input
            type="number"
            id="component-price"
            inputProps={{ step: "0.01" }}
            defaultValue={vacation.price}
            {...register("price", {
              required: true,
              min: 0,
              max: 10000,
            })}
          />
        </FormControl> */}
        <ValidationTextField
          className="TextBox"
          label="Price"
          inputProps={{ step: "0.01" }}
          variant="outlined"
          defaultValue={vacation.price}
          id="validation-outlined-input"
          {...register("price", {
            min: 0,
            max: 10000,
          })}
        />
        {/* <FormControl className="TextBox">
          <InputLabel htmlFor="component-price">Price</InputLabel>
          <Input
            type="number"
            id="component-price"
            
            {...register("price", {
              required: true,
              min: 0,
              max: 10000,
            })}
          />
        </FormControl> */}

        {errors.price?.type === "min" && (
          <span>A price cannot be negative</span>
        )}
        {errors.price?.type === "max" && (
          <span>A price can be maximum $10000</span>
        )}
        <FormControl className="TextBox">
          <InputLabel htmlFor="component-from" shrink={true}>
            From
          </InputLabel>
          <Input
            type="date"
            id="component-from"
            defaultValue={vacation.startDate}
            {...register("startDate", {
              required: true,
            })}
          />
        </FormControl>
        {errors.startDate?.type === "required" && (
          <span>Please enter a start date</span>
        )}
        <FormControl className="TextBox">
          <InputLabel htmlFor="component-to" shrink={true}>
            To
          </InputLabel>
          <Input
            type="date"
            id="component-to"
            defaultValue={vacation.endDate}
            {...register("endDate", {
              required: true,
            })}
          />
        </FormControl>
        {errors.endDate?.type === "required" && (
          <span>Please enter an end date</span>
        )}
        <FormControl className="TextBox">
          <InputLabel htmlFor="component-image">Upload an image</InputLabel>
          <Input
            type="file"
            id="component-image"
            inputProps={{
              accept: "image/png, image/jpg, image/jpeg",
            }}
            {...register("image")}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpdateVacation;
