import * as React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";

function AppBarComponent(props) {
  let { onSubscriptionClick, onQueryClick, onLogoutClick, userName } = props;
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={onSubscriptionClick}
              sx={{ my: 2, color: "white", display: "block" }}>
              Subscription
            </Button>
            <Button
              onClick={onQueryClick}
              sx={{ my: 2, color: "white", display: "block" }}>
              Query
            </Button>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              paddingRight: 5,
            }}>
            Hey, {userName}!
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={onLogoutClick}
              sx={{ my: 2, color: "white", display: "block" }}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export { AppBarComponent };
