import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Divider,
} from "@mui/material";

function PostEditDialog(props) {
  let { onClose, open, editPost, info } = props;
  const [editedPost, setEditPost] = React.useState();

  function onAgree() {
    editPost(editedPost);
    onClose();
  }

  function onDisagree() {
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle> Edit </DialogTitle>
      <Divider style={{ borderColor: "black" }} />
      <TextField
        autoFocus
        multiline
        style={{ padding: 20 }}
        rows={2}
        margin='dense'
        variant='standard'
        defaultValue={info.post}
        onChange={function (event) {
          setEditPost(event.target.value);
        }}
      />
      <DialogActions>
        <Button onClick={onAgree} autoFocus>
          Edit
        </Button>
        <Button onClick={onDisagree}> Cancel </Button>
      </DialogActions>
    </Dialog>
  );
}

export { PostEditDialog };
