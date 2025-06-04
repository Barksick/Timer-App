import React from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";

import AppTitle from "../components/AppTitle";
import Logo from "../components/Logo";
import UserProfileButton from "../components/UserProfileButton";
import AboutAppButton from "../components/AboutAppButton";

function UserProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

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

      <Typography variant="h4" sx={{ mt: 2, mb: 4 }}>
        User Profile
      </Typography>

      
      <TableContainer component={Paper} sx={{ maxWidth: 600, border: "2px solid black" }}>
        <Table sx={{ minWidth: 300 }}>
          <TableBody>
            {[
              { label: "Name", value: currentUser?.name || "-" },
              { label: "Sex", value: currentUser?.sex || "-" },
              { label: "Date of birth", value: currentUser?.dob || "-" },
              { label: "Email", value: currentUser?.email || "-" },
            ].map((row, index) => (
              <TableRow key={index} sx={{ border: "1px solid black" }}>
                <TableCell
                  sx={{
                    border: "1px solid black",
                    fontWeight: "bold",
                    width: "40%",
                    backgroundColor: "#f9f9f9"
                  }}
                >
                  {row.label}
                </TableCell>
                <TableCell sx={{ border: "1px solid black" }}>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      

      <Button
        variant="contained"
        color="error"
        sx={{ mt: 4, mb: 2 }}
        onClick={handleLogout}
      >
        Log out
      </Button>

      <Logo />
    </Box>
  );
}

export default UserProfilePage;
