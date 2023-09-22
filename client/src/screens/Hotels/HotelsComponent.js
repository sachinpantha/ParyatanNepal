import React from "react";
import "./hotels.css";

import { BiPhoneCall } from "react-icons/bi";
import { BsBookmarkStar } from "react-icons/bs";

const HotelsComponent = () => {
  return (
    <>
      {ItemtoMap.map((element) => {
        return (
          <div className="hotelCompo" key={element.id}>
            <img src={element.image_url} alt="topi" />
            <h4>{element.item_name}</h4>
            <h6>{element.location}</h6>
            <div
              className="inside_div"
              style={{
                color: "rgba(0,0,0,0.4)",
                fontWeight: "bold",
              }}
            >
              <span>8.4</span>
              <span>Very good</span>
              <span>85 reviews</span>
            </div>
            <div className="buttons">
              <button>
                <BiPhoneCall
                  style={{
                    margin: "0 5px 0 0 ",
                    height: "15px",
                    width: "25px",
                  }}
                />
                call
              </button>
              <button>
                <BsBookmarkStar
                  style={{
                    margin: "0 5px 0 0 ",
                    height: "15px",
                    width: "25px",
                  }}
                />
                book
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

let ItemtoMap = [
  {
    id: 2,
    item_name: "The Great Yeti ",
    image_url: require("./Hotel assets/hyatt-regency-kathmandu.jpeg"),
    location: "Solokumbu, Nepal",
    price: 123,
  },

  {
    id: 2,
    item_name: "Rajesh dai ko bhansa ghar ",
    image_url: require("./Hotel assets/download.jpg"),
    location: "Solokumbu, Nepal",
    price: 123,
  },
  {
    id: 2,
    item_name: "Bajeko sekuwa ",
    image_url: require("./Hotel assets/16002324-pool-area-hyatt-regency-kathmandu.webp"),
    location: "Solokumbu, Nepal",
    price: 123,
  },
  {
    id: 2,
    item_name: "The nepali titanic  ",
    image_url: require("./Hotel assets/download.jpg"),
    location: "Solokumbu, Nepal",
    price: 123,
  },
  {
    id: 2,
    item_name: "The Great Yeti ",
    image_url: require("./Hotel assets/download (1).jpg"),
    location: "Solokumbu, Nepal",
    price: 123,
  },
  {
    id: 2,
    item_name: "The Great Yeti ",
    image_url: require("./Hotel assets/hyatt-regency-kathmandu.jpeg"),
    location: "Solokumbu, Nepal",
    price: 123,
  },
];

export default HotelsComponent;
