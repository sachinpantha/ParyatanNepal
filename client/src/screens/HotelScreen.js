import React from "react";
import ComingSoon from "../coming-soon.svg";
function HotelScreen() {
  return (
    <div className="grid hotels" data-aos="fade-right">
      <img src={ComingSoon} alt="" className="coming-soon" />
      <h1>Launching Soon</h1>
    </div>
  );
}

export default HotelScreen;
