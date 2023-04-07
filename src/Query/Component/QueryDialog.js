import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
} from "@mui/material";

function QueryDialog(props) {
  let { onClose, open, onSubscribe, queryData } = props;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth='lg'>
        <DialogTitle> Search Result </DialogTitle>
        <DialogContent>
          {queryData == {} ? (
            <Card
              variant='outlined'
              style={{ border: "1px solid gray", marginBottom: 20 }}>
              <CardHeader
                title={"No result is retrieved. Please query again"}
              />
            </Card>
          ) : (
            <Card
              variant='outlined'
              style={{ border: "1px solid gray", marginBottom: 20 }}>
              <CardHeader title={`Title: ${queryData.title}`} />
              <CardHeader title={`Artist: ${queryData.artist}`} />
              <CardHeader title={`Year: ${queryData.year}`} />
              <CardContent>
                <CardMedia
                  sx={{ maxWidth: 300, maxHeight: 250 }}
                  component='img'
                  src={queryData.image}
                />
              </CardContent>
            </Card>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubscribe}> Subscribe </Button>
          <Button onClick={onClose}> Close </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export { QueryDialog };
