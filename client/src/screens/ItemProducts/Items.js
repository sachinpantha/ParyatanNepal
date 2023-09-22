import React from "react";
import ItemComponent from "./ItemComponent";
import "./items.css";

const Items = () => {
  return (
    <div className="container">
      <h3 className="mall_title">Paryatan Nepal Mall</h3>
      <div className="item">
        <ItemComponent />
      </div>
      <p className="mall_p">
        Want to book
        <a
          href="#"
          style={{
            color: "blue",
            padding: "0 3px",
          }}
        >
          hotel
        </a>
        ?
      </p>
    </div>
  );
};

export default Items;
