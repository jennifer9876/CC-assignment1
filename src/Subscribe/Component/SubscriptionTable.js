import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  mapSubscriptionData,
  deleteSubscriber,
  createSubscriber,
} from "../../AWS/subscribeService";
import { Button } from "@mui/material";

function SubscriptionTable() {
  const [subData, setSubData] = React.useState(null);

  async function handleButtonToggle(subscriptionData) {
    if (subscriptionData.subscribedStatus == "Remove") {
      await deleteSubscriber(subscriptionData.title);
    } else {
      await createSubscriber(subscriptionData.title);
    }
    let list = await mapSubscriptionData();
    setSubData(list);
  }

  if (subData == null) {
    mapSubscriptionData().then(function (rslt) {
      setSubData(rslt);
    });
  }

  let rows = subData || [];

  return (
    <div style={{ paddingTop: "5%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Subscribe/Remove</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.title}>
                <TableCell component='th' scope='row'>
                  {row.title}
                </TableCell>
                <TableCell>{row.artist}</TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>
                  <img src={row.image} width='150' height='150'></img>
                </TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    onClick={function () {
                      handleButtonToggle(row);
                    }}>
                    {`${row.subscribedStatus}`}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export { SubscriptionTable };
