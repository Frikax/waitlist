import React, { Component } from "react";
import "../main.css";

export default class LoadScreen extends Component {
  render() {
    return (
      <div
        className="mainDiv z-0 absolute flex flex-col h-screen justify-center items-center mx-auto w-full"
        id="loaderDiv"
      >
        <img src="/assets/png/logo.png" alt="loaderImg" className="loaderImg" />
        <div className="loadBar"></div>
      </div>
    );
  }
}
