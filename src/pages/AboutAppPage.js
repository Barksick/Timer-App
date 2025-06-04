import React from "react";
import { Box, Typography } from "@mui/material";
import AppTitle from "../components/AppTitle";
import Logo from "../components/Logo";
import UserProfileButton from "../components/UserProfileButton";
import AboutAppButton from "../components/AboutAppButton";

function AboutAppPage() {
  return (
    <Box 
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      minHeight="100vh"
      padding={2}
      boxSizing="border-box"
      position="relative"
    >
      <UserProfileButton />
      <AboutAppButton />

      <AppTitle />

      <Typography variant="h4">About App</Typography>

      <Typography variant="h5" textAlign="center" maxWidth="750px" marginBottom={4}>
        This app is designed to help you keep track of time. You can specify an arbitrary time,
        after which the application will notify you. <br />
        You can also watch the countdown in real time.
      </Typography>

      <Logo />
    </Box>
  );
}

export default AboutAppPage;
