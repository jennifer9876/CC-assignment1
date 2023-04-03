import * as React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";



function ConfirmEdit(props) {
    let { handleOpenConfirmEdit, handleCloseConfirmEdit, handleEdit, handleOpenAlertEdit } = props;

    function EditProfile() {
        handleEdit(handleEdit);
        handleOpenAlertEdit(handleOpenAlertEdit);
        handleCloseConfirmEdit(handleCloseConfirmEdit);
    }
    return (
        <Dialog open={handleOpenConfirmEdit} onClose={handleCloseConfirmEdit}>
            <DialogTitle>Confrim Edit</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseConfirmEdit}>Cancel</Button>
                <Button onClick={EditProfile}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

function ConfirmDelete(props) {
    let { handleOpenConfirmDelete, handleCloseConfirmDelete, handleOpenAlertDelete, handleDelete } = props;

    function confrimDelete() {
        handleDelete(handleDelete);
        handleOpenAlertDelete(handleOpenAlertDelete);
        handleCloseConfirmDelete(handleCloseConfirmDelete);
    }
    return (
        <Dialog open={handleOpenConfirmDelete} onClose={handleCloseConfirmDelete}>
            <DialogTitle>Confrim Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseConfirmDelete}>Cancel</Button>
                <Button onClick={confrimDelete}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export { ConfirmEdit, ConfirmDelete }