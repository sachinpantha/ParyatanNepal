import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillHome, AiOutlineArrowLeft, AiTwotoneHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";
const FormContainer = ({ children, custom }) => {
  let navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <Container className={custom && "custom-form-container"} data-aos="fade-right">
      <div className={custom && "custom-form"}>
        {custom && <>
          {/* <img className="form-logo" src={logo} /> */}
          <span className="back" onClick={handleGoBack}>
            <AiFillHome />
          </span>
        </>}
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} gap>
            {children}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default FormContainer;
