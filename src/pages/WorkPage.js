import React from "react";
import { Box, Stack } from "@mui/material";
import AppTitle from "../components/AppTitle";
import Logo from "../components/Logo";
import TimerDisplay from "../components/TimerDisplay";
import UserProfileButton from "../components/UserProfileButton";
import AboutAppButton from "../components/AboutAppButton";

function WorkPage() {
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
      
      <Stack spacing={{ xs: 3, sm: 6 }} alignItems="center" width="100%">
        <TimerDisplay />
      </Stack>

      <Logo />
    </Box>
  );
}

export default WorkPage;
