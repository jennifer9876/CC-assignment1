import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
  Divider,
} from "@mui/material";

function PostDeleteDialog(props) {
  let { onClose, open, deletePost } = props;

  function onAgree() {
    deletePost();
    onClose();
  }

  function onDisagree() {
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>Delete</DialogTitle>
      <Divider style={{ borderColor: "black" }} />
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAgree} autoFocus>
          Delete
        </Button>
        <Button onClick={onDisagree}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export { PostDeleteDialog };
