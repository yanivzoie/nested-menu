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
  addSubmenu,
  shouldOpen,
  closeDialog,
  dialogTitle,
}) {
  const textRef = useRef();
  const handleClose = () => {
    closeDialog(true);
  };
  const handleSubmit = () => {
    if (textRef.current.value !== "") {
      addSubmenu({ id: uuidv4(), label: textRef.current.value });
      closeDialog(true);
    }
  };
  return (
    <div>
      <Dialog open={shouldOpen} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please add Submenu..</DialogContentText>
          <TextField
            required
            inputRef={textRef}
            autoFocus
            margin="dense"
            id="name"
            label="Submenu"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
