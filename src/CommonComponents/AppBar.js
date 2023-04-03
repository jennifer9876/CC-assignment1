import * as React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";

function AppBarComponent(props) {
  let { onHomeClick, onProfileClick, onLogoutClick, userName } = props;
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar>
          <ForumIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            LAN
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={onHomeClick}
              sx={{ my: 2, color: "white", display: "block" }}>
              Home
            </Button>
            <Button
              onClick={onProfileClick}
              sx={{ my: 2, color: "white", display: "block" }}>
              Profile
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
            Hey,{userName}!
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
