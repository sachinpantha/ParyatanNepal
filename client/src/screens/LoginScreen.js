import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { login } from "../actions/userActions";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [type, setType] = useState("password");
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    if (email.length == 0) {
      toast('Email field must not be empty!', {
        type: 'warning',
        autoClose: 1500,
        position: 'top-right'
      })
    }
    else if (password.length == 0) {
      toast('Password field must not be empty!', {
        type: 'warning',
        autoClose: 1500,
        position: 'top-right'
      })
    }
    else if (password.length < 8) {
      toast('Password must be 8 characters long!', {
        type: 'warning',
        autoClose: 1500,
        position: 'top-right'
      })
    }
  };
  const handleToggle = () => {
    setType(type == "password" ? "text" : "password");
  };
  return (
    <FormContainer custom>
      <h5 style={{ color: "#DC3535" }}>Sign In</h5>
      {/* {error && <Message variant="danger">{error}</Message>} */}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="form"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <div className="fc-password">
            <Form.Control
              type={type}
              placeholder="Enter password"
              className="form password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            <span className="icon-holder" onClick={handleToggle}>
              {type == "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
        </Form.Group>

        <Button style={{ borderRadius: '5px', backgroundColor: '#CF0A0A' }} type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link style={{ color: "#DC3535" }} to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
