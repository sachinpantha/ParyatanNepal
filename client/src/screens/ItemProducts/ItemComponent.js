import React from "react";
import "./items.css";

const ItemComponent = () => {
  return (
    <>
      {ItemtoMap.map((element) => {
        return (
          <div className="itemCompo" key={element.id}>
            <img src={element.image_url} alt="topi" />
            <h4>{element.item_name}</h4>
            <span>$ {element.price}</span>
            <button>Buy</button>
          </div>
        );
      })}
    </>
  );
};

let ItemtoMap = [
  {
    id: 2,
    item_name: "Nepali dhaka Topi",
    image_url: require("./Items Assets/dhaka_topi.jpg"),
    price: 123,
  },
  {
    id: 3,
    item_name: "Nepali chasma",
    image_url: require("./Items Assets/chasma.jpg"),
    price: 145,
  },
  {
    id: 7,
    item_name: "Nepali mandala",
    image_url: require("./Items Assets/mandala-2.jpg"),
    price: 123,
  },
  {
    id: 4,
    item_name: "Nepali watch",
    image_url: require("./Items Assets/watch.jpg"),
    price: 160,
  },
  {
    id: 44,
    item_name: "Nepali posak",
    image_url: require("./Items Assets/dress.webp"),
    price: 123,
  },
  {
    id: 5,
    item_name: "Nepali dhaka Topi",
    image_url: require("./Items Assets/watch.jpg"),
    price: 123,
  },
  {
    id: 6,
    item_name: "Nepali ornaments",
    image_url: require("./Items Assets/culture.jpeg"),
    price: 123,
  },

  {
    id: 8,
    item_name: "Nepali handmade shoe",
    image_url: require("./Items Assets/shoe.jpg"),
    price: 123,
  },
];

export default ItemComponent;
