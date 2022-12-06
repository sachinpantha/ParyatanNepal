import React from "react";
import Button from "../components/Button";
import logo from "../logo.png";
import landing from "../landing.jpg";
import { useNavigate } from "react-router-dom";
import LoginScreen from "./LoginScreen";
function LandingPage() {
  const navigate = useNavigate();
  const loginPage = () => {
    navigate("login", { replace: true });
  };
  const signUpPage = () => {
    navigate("register", { replace: true });
  };
  return (
    <>
      <div className="overlay" />
      <div className="landingPage">
        <div className="landing-nav" data-aos="zoom-out-right">
          <div className="logo">
            <img src={logo} width="200" />
          </div>
          <div className="btn-container">
            <Button text={`Login`} clickEvent={loginPage} />
            <Button text={`Sign Up`} primary clickEvent={signUpPage} />
          </div>
        </div>
        <div className="landing-content" data-aos="zoom-out-right">
          <h1>
            <q>तपाईंको पर्यटकिय साथी</q>
          </h1>
        </div>
        {/* <div className="absolute">
        <LoginScreen />
        </div> */}
      </div>
    </>
  );
}

export default LandingPage;
