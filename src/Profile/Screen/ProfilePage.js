import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Menu, MenuItem, Paper, Divider } from "@mui/material";
//dialog imports
import { AppBarComponent } from "../../CommonComponents/AppBar";
import { useNavigate } from "react-router-dom";
import { EditDialog } from "../Component/EditDialog";
import { ConfirmEdit, ConfirmDelete } from "../Component/ConfirmDialog";
import Alerts from "../../CommonComponents/Alert";
import { getLocalUser } from "../../AWS/route";

const ProfilePage = ({ loggedInUser, onLogout, onDelete }) => {
  const [fName, setFirstName] = React.useState("");
  const [lName, setLastName] = React.useState("");
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem(loggedInUser));

  function handleHomePage() {
    navigate("/subscriptionpage");
  }
  function handleProfilePage() {
    navigate("/profilepage");
  }

  let loginInfo = getLocalUser();

  const handleLogout = () => {
    onLogout();
    navigate("/", {
      replace: true,
    });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //dialog use
  const handleOpenDialog = () => {
    handleClickOpen();
    handleClose();
  };
  const [openDialog, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };
  //actual function for editing the fullname
  const handleEdit = () => {
    let user = localStorage.getItem(loggedInUser);
    user = JSON.parse(user);
    if (fName !== "") {
      user.firstName = fName;
    }
    if (lName !== "") {
      user.lastName = lName;
    }
    localStorage.setItem(loggedInUser, JSON.stringify(user));
    handleDialogClose();
  };
  //actual function for deleting the profile
  const handleDelete = () => {
    let postIds = localStorage.getItem(loggedInUser);
    postIds = JSON.parse(postIds);
    postIds = postIds.userPostIds;
    onLogout();
    for (let postId of postIds) {
      console.log(postId);
      onDelete(postId);
    }
    localStorage.removeItem(loggedInUser);
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);

    handleClose();
  };
  //open and closing the popup for confirming edit
  const [openConfirmEdit, setOpenConfirmEdit] = React.useState(false);
  const handleOpenConfirmEdit = () => {
    setOpenConfirmEdit(true);
  };
  const handleCloseConfirmEdit = () => {
    setOpenConfirmEdit(false);
  };
  //open and closing the popup for confirming delete
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const handleOpenConfirmDelete = () => {
    handleClose();
    setOpenConfirmDelete(true);
  };
  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };
  //open and closing of successful alert for edit
  const [openAlertEdit, setOpenAlertEdit] = React.useState(false);
  const handleOpenAlertEdit = () => {
    setOpenAlertEdit(true);
  };
  const handleCloseAlertEdit = () => {
    setOpenAlertEdit(false);
  };
  //open and closing of successful alert for delete
  const [openAlertDelete, setOpenAlertDelete] = React.useState(false);
  const handleOpenAlertDelete = () => {
    setOpenAlertDelete(true);
  };
  const handleCloseAlertDelete = () => {
    setOpenAlertDelete(false);
  };

  return (
    <>
      <AppBarComponent
        onSubscriptionClick={handleHomePage}
        onQueryClick={handleProfilePage}
        onLogoutClick={handleLogout}
        userName={loginInfo.user_name}
      />
      <div style={{ paddingTop: "5%" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 400,
              height: 300,
            },
          }}>
          <Paper elevation={3}>
            <div style={{ display: "flex" }}>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <h1 style={{ paddingLeft: 10 }} sx={{ flexGrow: 1 }}>
                  Profile
                </h1>
              </Box>
              <Box sx={{ flexGrow: 0 }} style={{ paddingTop: 25 }}>
                <IconButton
                  aria-label='more'
                  id='long-button'
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup='true'
                  onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id='long-menu'
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: "20ch",
                    },
                  }}>
                  <MenuItem onClick={handleOpenDialog}>Edit</MenuItem>
                  <MenuItem onClick={handleOpenConfirmDelete}>Delete</MenuItem>
                </Menu>
              </Box>
            </div>
            <Divider />
            <h2 style={{ paddingLeft: 10 }}>
              Name: {user !== null ? user.firstName : ""}{" "}
              {user !== null ? user.lastName : ""}
            </h2>
            <h2 style={{ paddingLeft: 10 }}>E-mail: {loggedInUser}</h2>
            <Divider />
            <h3 style={{ paddingLeft: 10 }}>
              Joined: {user !== null ? user.signupDate : ""}
            </h3>
          </Paper>
        </Box>
      </div>
      {/* dialog use */}
      <div>
        <EditDialog
          openDialog={openDialog}
          handleDialogClose={handleDialogClose}
          handleOpenConfirmEdit={handleOpenConfirmEdit}
          handleOpenAlertEdit={handleOpenAlertEdit}
          user={user}
          setFirstName={setFirstName}
          setLastName={setLastName}
        />
        <ConfirmEdit
          handleOpenAlertEdit={handleOpenAlertEdit}
          handleOpenConfirmEdit={openConfirmEdit}
          handleCloseConfirmEdit={handleCloseConfirmEdit}
          handleEdit={handleEdit}
        />
        <ConfirmDelete
          handleDelete={handleDelete}
          handleOpenConfirmDelete={openConfirmDelete}
          handleCloseConfirmDelete={handleCloseConfirmDelete}
          handleOpenAlertDelete={handleOpenAlertDelete}
        />
        <Alerts
          open={openAlertEdit}
          severity='success'
          onClose={handleCloseAlertEdit}
          customText='You have successfully edited your fullname'
        />
        <Alerts
          open={openAlertDelete}
          severity='success'
          onClose={handleCloseAlertDelete}
          customText='You have confirmed to delete profile, deleting...'
        />
      </div>
    </>
  );
};
export default ProfilePage;
