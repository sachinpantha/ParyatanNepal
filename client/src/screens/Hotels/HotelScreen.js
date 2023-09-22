import React from "react";
import "./hotels.css";
import HotelsComponent from "./HotelsComponent";

const HotelScreen = () => {
  return (
    <div className="container">
      <h1 className="hotel_title">Best hotels near you</h1>
      <div className="hotels">
        <HotelsComponent />
      </div>
    </div>
  );
};

export default HotelScreen;
