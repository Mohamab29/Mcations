import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { checkStartEndDate } from "../../../Helpers/HandleDate";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import { VacationsActionType } from "../../../Redux/VacationsState";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import realTimeService from "../../../Services/RealTimeIO";
import "./AddVacation.css";

interface AddVacationProps {
  popupOpen: boolean;
  setPopupOpen: Function;
}

function AddVacation(props: AddVacationProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VacationModel>({ mode: "onBlur" });

  async function send(vacation: VacationModel) {
    try {
      const checked = checkStartEndDate(vacation.startDate, vacation.endDate);
      if (!checked.answer) {
        return notify.error(checked.message);
      }
      //   we put the upload the image so we put it in form data
      const formData = new FormData();
      formData.append("image", vacation.image.item(0));
      const imageResponse = await jwtAxios.post<string>(
        config.vacationImagesURL,
        formData
      );
      vacation.imageName = imageResponse.data;

      //   here we send all the form to the back end after successfully adding an image
      const response = await jwtAxios.post<VacationModel>(
        config.vacationsURL,
        vacation
      );
      store.dispatch({
        type: VacationsActionType.VacationAdded,
        payload: response.data,
      });
      realTimeService.addVacation(response.data);
      notify.success("vacation added successfully.");
      props.setPopupOpen(false);
    } catch (error) {
      notify.error(error);
    }
  }
  return (
    <div className="AddVacation">
      <form onSubmit={handleSubmit(send)}>
        <TextField
          label="Destination"
          variant="standard"
          className="TextBox"
          {...register("destination", {
            required: true,
            minLength: 4,
            maxLength: 60,
          })}
        />
        {errors.destination?.type === "required" && (
          <span>Please enter your first name</span>
        )}

        {errors.destination?.type === "minLength" && (
          <span>A destination should be at least 4 characters</span>
        )}
        {errors.destination?.type === "maxLength" && (
          <span>A destination should be at most 60 characters</span>
        )}
        <TextField
          size="medium"
          label="Description"
          variant="standard"
          className="TextBox"
          {...register("description", {
            required: true,
            minLength: 10,
            maxLength: 1500,
          })}
        />
        {errors.description?.type === "required" && (
          <span>Please enter your description</span>
        )}
        {errors.description?.type === "minLength" && (
          <span>A description should be at least 10 characters</span>
        )}
        {errors.description?.type === "maxLength" && (
          <span>A description should be at most 1500 characters</span>
        )}
        <TextField
          type="number"
          inputProps={{ step: "0.01" }}
          label="price"
          variant="standard"
          className="TextBox"
          {...register("price", {
            required: true,
            min: 0,
            max: 10000,
          })}
        />
        {errors.price?.type === "required" && <span>Please enter a price</span>}
        {errors.price?.type === "min" && (
          <span>A price cannot be negative</span>
        )}
        {errors.price?.type === "max" && (
          <span>A price can be maximum $10000</span>
        )}
        <TextField
          type="date"
          label="from"
          variant="standard"
          className="TextBox"
          {...register("startDate", {
            required: true,
          })}
        />
        {errors.startDate?.type === "required" && (
          <span>Please enter a start date</span>
        )}
        <TextField
          type="date"
          label="to"
          variant="standard"
          className="TextBox"
          {...register("endDate", {
            required: true,
          })}
        />
        {errors.endDate?.type === "required" && (
          <span>Please enter an end date</span>
        )}

        <TextField
          inputProps={{
            accept: "image/png, image/jpg, image/jpeg",
          }}
          label="Upload image"
          type="file"
          variant="standard"
          {...register("image", {
            required: true,
          })}
        />
        {errors.image?.type === "required" && (
          <span>Please upload an image </span>
        )}

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddVacation;
