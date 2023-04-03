import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendRounded from "@mui/icons-material/SendRounded";
import { PostEditDialog } from "./PostEditDialog";
import { PostDeleteDialog } from "./PostDeleteDialog";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Grow,
  Popper,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  List,
  TextField,
  CardMedia,
} from "@mui/material";

function PostCard(props) {
  let { postId, onDelete, onEdit, firstName } = props;
  let postInfo = window.localStorage.getItem("post_" + postId);
  postInfo = JSON.parse(postInfo);

  let commentList = postInfo.comment;

  const [open, setOpen] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [comment, setComment] = React.useState();
  const anchorRef = React.useRef(null);
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  //handles the toggle on the press of the kebab menu in every post
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function handleEdit(editedPost) {
    onEdit(postId, editedPost);
  }

  function handleDelete() {
    onDelete(postId);
  }

  function addComment() {
    // Trim the comment.
    const commentTrimmed = comment.trim();
    if (commentTrimmed !== "") {
      let newComment = {
        user: firstName,
        text: commentTrimmed,
      };

      postInfo.comment.push(newComment);

      // Set data into local storage.
      window.localStorage.setItem("post_" + postId, JSON.stringify(postInfo));

      setComment("");
    }
  }

  function handleEditDialogOpen() {
    setOpenEditDialog(true);
  }

  function handleEditDialogClose() {
    setOpenEditDialog(false);
  }

  function handleDeleteDialogOpen() {
    setOpenDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setOpenDeleteDialog(false);
  }

  return (
    <div style={{ paddingBottom: 40 }}>
      <Card variant='outlined' style={{ border: "1px solid gray" }}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon ref={anchorRef} onClick={handleToggle} />
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement='bottom-start'
                transition
                disablePortal={false}>
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open}>
                          <MenuItem onClick={handleEditDialogOpen}>
                            Edit
                          </MenuItem>
                          <MenuItem onClick={handleDeleteDialogOpen}>
                            Delete
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </IconButton>
          }
          title={postInfo.username}
        />
        <CardContent>
          <Typography variant='body2'> {postInfo.post} </Typography>
          {postInfo.img ? (
            <CardMedia
              sx={{ maxWidth: 300, maxHeight: 250 }}
              component='img'
              src={postInfo.img}
            />
          ) : (
            <></>
          )}
        </CardContent>
      </Card>

      <PostEditDialog
        onClose={handleEditDialogClose}
        open={openEditDialog}
        editPost={handleEdit}
        info={postInfo}
      />

      <PostDeleteDialog
        onClose={handleDeleteDialogClose}
        open={openDeleteDialog}
        deletePost={handleDelete}
      />

      {commentList.map((val, idx) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          <List
            sx={{
              width: "99%",
              bgcolor: "background.paper",
              borderLeftStyle: "solid",
              borderRightStyle: "solid",
              borderColor: "#1976d2",
              borderWidth: "thick",
              padding: 0,
            }}>
            <ListItem alignItems='flex-start'>
              <ListItemText primary={val.user} secondary={val.text} />
            </ListItem>
            <Divider />
          </List>
        </div>
      ))}
      <TextField
        style={{ width: "97%" }}
        placeholder={"Reply..."}
        variant='filled'
        onChange={function (event) {
          setComment(event.target.value);
        }}
        value={comment}
      />
      <SendRounded
        sx={{
          display: {
            xs: "none",
            md: "inline",
            paddingTop: 15,
            paddingLeft: 10,
          },
        }}
        onClick={addComment}
      />
    </div>
  );
}
export { PostCard };
