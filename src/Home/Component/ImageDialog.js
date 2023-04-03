import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Divider,
} from "@mui/material";

function ImageDialog(props) {
  let { onClose, open, handlePhoto } = props;
  const [imageURL, setImageURL] = React.useState();

  function onAgree() {
    handlePhoto(imageURL);
    onClose();
  }

  function onDisagree() {
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle> Attach </DialogTitle>
      <Divider style={{ borderColor: "black" }} />
      <TextField
        autoFocus
        style={{ padding: 20 }}
        margin='dense'
        variant='standard'
        placeholder='Paste URL here...'
        onChange={function (event) {
          setImageURL(event.target.value);
        }}
      />
      <DialogActions>
        <Button onClick={onAgree} autoFocus>
          Attach
        </Button>
        <Button onClick={onDisagree}> Cancel </Button>
      </DialogActions>
    </Dialog>
  );
}

export { ImageDialog };
