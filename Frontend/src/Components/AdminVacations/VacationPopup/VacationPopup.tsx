import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import { CloseSharp } from "@material-ui/icons";
import VacationModel from "../../../Models/VacationModel";
import AddVacation from "../AddVacation/AddVacation";
import UpdateVacation from "../UpdateVacation/UpdateVacation";
import "./VacationPopup.css";

interface VacationPopupProps {
  vacation?: VacationModel;
  popupOpen: boolean;
  setPopupOpen: Function;
}
function VacationPopup(props: VacationPopupProps): JSX.Element {
  const handleClose = () => {
    props.setPopupOpen(false);
  };
  return (
    <>
      <Dialog open={props.popupOpen} className="popup-form">
        <DialogTitle className="form-dialog-title">
          <Typography variant="body2">
            {!props.vacation ? "Add a vacation" : "Update a vacation"}
          </Typography>
          <IconButton
            onClick={() => handleClose()}
            color="secondary"
            className="form-close-button"
          >
            <CloseSharp />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="form-content">
          {props.vacation ? (
            <UpdateVacation
              setPopupOpen={props.setPopupOpen}
              popupOpen={props.popupOpen}
              vacation={props.vacation}
            />
          ) : (
            <AddVacation
              setPopupOpen={props.setPopupOpen}
              popupOpen={props.popupOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VacationPopup;
