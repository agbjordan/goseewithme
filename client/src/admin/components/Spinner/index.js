import React, { Component } from "react";
import SpinnerGIF from "./Loading_icon.gif";

class Spinner extends Component {
  render() {
    return (
      <div>
        <img
          src={SpinnerGIF}
          alt="Loading..."
          style={{ width: 200, margin: "auto", display: "block" }}
        />
      </div>
    );
  }
}
export default Spinner;
