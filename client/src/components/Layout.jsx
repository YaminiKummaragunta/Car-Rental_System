import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      {/*<main> {children}</main>*/}
      <main
        style={{
          height: "80vh",
          flex: 1,
          backgroundColor: "#e0f7fa",
          paddingTop: "2rem",
        }}
      >
        {" "}
        <div style={{marginBottom:"1rem"}}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
export default Layout;
