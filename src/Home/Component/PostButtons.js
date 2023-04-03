import * as React from "react";
import { Box, Button } from "@mui/material";

function PostButtons(props) {
  let { addPost, clearPost } = props;
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-around",
        paddingTop: 20,
        width: 180,
      }}>
      <Button
        style={{
          height: 50,
        }}
        variant='contained'
        onClick={addPost}>
        Post
      </Button>
      <Button
        variant='contained'
        color='error'
        style={{
          height: 50,
        }}
        onClick={() => {
          clearPost();
        }}>
        Clear
      </Button>
    </Box>
  );
}

export { PostButtons };
