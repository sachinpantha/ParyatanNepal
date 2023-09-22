import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("password");
  const [userType, setUserType] = useState(0);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
  const handleToggle = () => {
    setType(type == "password" ? "text" : "password");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("Password does not match!", {
        type: "warning",
        autoClose: 1500,
        position: "top-right",
      });
    } else if (password.length < 8) {
      toast("Password must be 8 characters long!", {
        type: "warning",
        autoClose: 1500,
        position: "top-right",
      });
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer custom>
      <h5 style={{ color: "#DC3535" }}>Sign Up</h5>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            required
            autoComplete="off"
            placeholder="Enter name"
            className="form"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            autoComplete="off"
            required
            placeholder="Enter email"
            value={email}
            className="form"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <div className="fc-password">
            <Form.Control
              type={type}
              autoComplete="off"
              required
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

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <div className="fc-password">
            <Form.Control
              required
              type={type}
              autoComplete="off"
              placeholder="Confirm password"
              className="form"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </div>
        </Form.Group>
        <Form.Group controlId="userType">
          <Form.Label>Sign up as</Form.Label>
          <Form.Select
            required
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value={0}>Tourist</option>
            <option value={1}>Guide</option>
          </Form.Select>
        </Form.Group>

        <Button
          style={{ borderRadius: "5px", backgroundColor: "#CF0A0A" }}
          type="submit"
          variant="primary"
        >
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link
            style={{ color: "#DC3535" }}
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
