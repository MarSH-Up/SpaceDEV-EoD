import React, { useState } from "react";
import "./styles/Title.css";
import "./styles/styles.css";
import GetInputs from "./components/getInputs/getInputs";

function App() {
  return (
    <>
      <div className="page">
        <div className="max-w-5xl">
          <h1 className="tracking-in-expand-fwd-top ">Welcome to SpaceEoD!</h1>
          <br />
          <GetInputs />
          <br />
        </div>
      </div>
    </>
  );
}

export default App;
