import React from "react";
import Button from "../components/Button";
import Typewriter from "typewriter-effect";
import { Link, useNavigate } from "react-router-dom";

import BGImg from "../landing_bg.jpg";
import NavLogo from "../assets/pngLOGO.png";
import RamroImg from "../assets/ramroIMG.png";

function LandingPage() {
  return (
    <>
      <div className="home">
        <PageCompoenent />
        <LandingAboutPage />
        <TopDestinations />
      </div>
    </>
  );
}

export default LandingPage;

const PageCompoenent = () => {
  const navigate = useNavigate();

  const loginPage = () => {
    navigate("login", { replace: true });
  };

  const signUpPage = () => {
    navigate("register", { replace: true });
  };

  return (
    <section className="landingpage">
      <div className="landingpage__wrapper"></div>
      <div className="landingpage__overlay"></div>

      <div className="landingpage__main">
        <div
          className="landingpage__header container"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {/* <h1>Sangraha Nepal</h1> */}
          <img src={NavLogo} alt="" />
          <div className="landingpage__header__buttons">
            <Button text={`Login`} clickEvent={loginPage} />
            <Button text={`Sign Up`} primary clickEvent={signUpPage} />
          </div>
        </div>
        <div
          className="landingpage__content"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <Typewriter
            options={{
              strings: [
                "तपाईंको पर्यटकिय साथी",
                "Your gateway to heart of Nepal",
                "Unfold Nepal's Wonders with Ease",
                "Your Journey, Our Expertise",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
    </section>
  );
};

const LandingAboutPage = () => {
  return (
    <section className="about" data-aos="fade-up" id="about">
      <div className="about__wrapper container">
        <div className="about__left">
          <h1>About Sangraha Nepal</h1>
          <p>
            Welcome to Sangraha Nepal, your ultimate gateway to an authentic and
            unforgettable adventure in the heart of Nepal. Immerse yourself in
            the stunning beauty and rich culture of this remarkable country
            through our web app. We offer curated tours led by passionate local
            guides who will introduce you to the hidden treasures of Nepal, from
            ancient temples and monasteries to bustling street markets. Say
            goodbye to generic hotels and embrace the warmth of locally-owned
            accommodations that showcase Nepal's traditional charm. Explore the
            natural wonders of Nepal, from the towering Himalayas to lush
            forests and pristine lakes, all while fostering meaningful
            connections with friendly locals.
          </p>
          <p>
            Our user-friendly interface ensures seamless planning, and our
            commitment to responsible travel means that you'll not only have an
            incredible experience but also contribute to the preservation of
            Nepal's cultural and natural heritage. With Sangraha Nepal, your
            adventure begins now – explore, discover, and create lasting
            memories in this enchanting land.
          </p>
        </div>
        <div className="about__right">
          <img src={RamroImg} alt="" />
        </div>
      </div>
    </section>
  );
};

const MockData = [300, 400, 500, 600, 700, 800, 600, 600];

const TopDestinations = () => {
  return (
    <section className="topdestinations">
      <div className="topdestinations__wrapper container">
        <h1 className="topdestinations__heading" data-aos="fade-up">
          Top Destination To Travel with Sangraha Nepal
        </h1>

        <div className="topdestinations__main">
          {MockData.map((item) => {
            return (
              <a
                href="#"
                className="topdestination__link"
                key={Math.random() * 1000}
                data-aos="fade-up"
                data-aos-duration={1000 + item}
              >
                <figure className="topdestinations__image">
                  <div className="topdestinations__overlay showoverlay">
                    <p>View Information</p>
                  </div>
                  <img src={BGImg} alt="" />
                </figure>
              </a>
            );
          })}
        </div>
        <div className="mt-5" data-aos="fade-up">
          <Button text={`More`} />
        </div>
      </div>
    </section>
  );
};
