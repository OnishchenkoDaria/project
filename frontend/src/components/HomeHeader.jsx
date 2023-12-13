import React from "react";

const HomeHeader = () => {
  const headerStyle = {
    position: "relative",
    background: "#222",
    color: "#fff",
    padding: "2rem",
    textAlign: "center",
    borderBottom: "1px solid #444",

    logo: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      margin: "0",
    },
  };

  return (
    <header style={headerStyle}>
      <div style={headerStyle.logo}>KURYLENKO</div>
      <div style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>
        Професійний фотограф
      </div>
    </header>
  );
};

export default HomeHeader;
