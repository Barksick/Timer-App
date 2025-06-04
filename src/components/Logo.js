import React from "react";
import logo from "../logo2.png";

function Logo() {
  return (
    <img 
      src={logo} 
      alt="Logo" 
      style={{ 
        width: "100%",
        maxWidth: "500px",
        height: "auto",
        maxHeight: "300px",
        objectFit: "contain",
        marginTop: "-20px",
      }}
    />
  );
}

export default Logo;
