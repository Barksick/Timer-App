import React from "react";
import { Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function AppTitle() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const currentPath = location.pathname;
    if (currentPath === "/login" || currentPath === "/register") {
      navigate("/login");
    } else {
      navigate("/timer");
    }
  };

  return (
    <Typography
      variant="h2"
      component="h1"
      sx={{
        mt: { xs: 4, sm: 10 },
        fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
        textAlign: "center",
        cursor: "pointer",
        transition: "color 0.3s",
        "&:hover": {
          color: "primary.main"
        }
      }}
      onClick={handleClick}
    >
      Simple Timer
    </Typography>
  );
}

export default AppTitle;
