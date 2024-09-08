import React from "react";
import Button from "../components/Button";
import logo from "../logo.png";
import Typewriter from "typewriter-effect";
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
        <div className="landing-content">
          <Typewriter
            options={{
              strings: [
                "तपाईंको पर्यटकिय साथी",
                "Travel smarter with Nepwonders",
                "Guiding destinations",
                "An ecosystem for your vacations",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        {/* <div className="absolute">
        <LoginScreen />
        </div> */}
      </div>
    </>
  );
}

export default LandingPage;
