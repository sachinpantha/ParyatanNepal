import React from "react";
import { Container } from "react-bootstrap";
import { ImMap as Guide } from "react-icons/im";
import {
  FaBed as Hotels,
  FaShoppingBasket as LocalVendor,
} from "react-icons/fa";
import { Link } from "react-router-dom";
function ServiceScreen() {
  const services = [
    {
      color: "#E56060",
      icon: <Guide />,
      title: "Guides",
      path: "/guides",
    },
    {
      color: "#699BF7",
      icon: <Hotels />,
      path: "/hotels",
      title: "Hotels",
    },
    {
      color: "#4ECB71",
      icon: <LocalVendor />,
      path: "/local-vendors",
      title: "Paryatan Mall",
    },
  ];
  return (
    <div className="services grid">
      <h1 data-aos="fade-up">Select Services</h1>
      <div className="services-row grid">
        {services.map((service, id) => (
          <Link
            data-aos="fade-up"
            data-aos-delay={200 * id}
            key={`service-${id}`}
            to={service.path}
            className="service-box grid"
            style={{ background: service.color }}
          >
            <div className="content grid">
              <span className="icon">{service.icon}</span>
              <span className="title">{service.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ServiceScreen;
