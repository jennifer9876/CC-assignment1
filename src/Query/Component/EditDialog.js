import * as React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";



function EditDialog(props) {
    let { openDialog, handleDialogClose, handleOpenConfirmEdit, user, setFirstName, setLastName } = props;

    function EditProfile() {
        handleOpenConfirmEdit(handleOpenConfirmEdit);
        handleDialogClose(handleDialogClose);
    }

    return (
        <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the details you would like to change.
                </DialogContentText>
                <input type="text" defaultValue={user !== null ? user.firstName : ""} onChange={function (event) { setFirstName(event.target.value) }} />
                <input type="text" defaultValue={user !== null ? user.lastName : ""} onChange={function (event) { setLastName(event.target.value) }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={EditProfile}>Edit</Button>
            </DialogActions>
        </Dialog>
    )
}

export { EditDialog }