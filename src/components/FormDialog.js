import React, { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { v4 as uuidv4 } from "uuid";

export default function FormDialog({
  onAddSubmenuSubmit,
  onEditSubmenuSubmit,
  shouldOpen,
  closeDialog,
  dialogTitle,
  isEdit,
}) {
  const textRef = useRef();
  const handleClose = () => {
    closeDialog(true);
  };
  const handleAddSubmit = () => {
    if (textRef.current.value !== "") {
      onAddSubmenuSubmit({ id: uuidv4(), label: textRef.current.value });
      closeDialog(true);
    }
  };
  const handleEditSubmit = () => {
    if (textRef.current.value !== "") {
      onEditSubmenuSubmit({label: textRef.current.value} );
      closeDialog(true);
    }
  };
  return (
    <div>
      <Dialog open={shouldOpen} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            required
            inputRef={textRef}
            autoFocus
            margin="dense"
            id="name"
            label="Type here please.."
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {isEdit ? (
            <Button onClick={handleEditSubmit}>Done</Button>
          ) : (
            <Button onClick={handleAddSubmit}>Done</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
