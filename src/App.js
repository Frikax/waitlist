import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Loader from "./components/Loader";
import Header from "./assets/Header.svg";
import All from "./assets/All.png";
import Mobile from "./assets/Mobile.png";
import RightText from "./components/RightText";
import LeftText from "./components/LeftText";
import RightTextBig from "./components/RightTextBig";
import LeftTextBig from "./components/LeftTextBig";
import { gsap } from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import Typed from "typed.js";
import { FaTwitter } from "react-icons/fa";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Success from "./components/Success";
import Error from "./components/Error";

function App() {
  //Current year
  const Year = new Date().getFullYear();

  const [Email, setEmail] = useState("");
  const [Status, setStatus] = useState({
    Error: false,
    Loading: false,
    Success: false,
    Text: "",
  });
  const [Modal, setModal] = useState({
    Error: false,
    Success: false,
    Text: "Hello",
  });

  //Reset Modal State
  const resetModal = (duration) => {
    setTimeout(() => {
      setModal({
        Error: false,
        Success: false,
        Text: "",
      });
    }, duration);
  };

  const CaptchaRef = useRef();

  const TypedText = useRef();
  //Initiate AOS and typed.js
  useEffect(() => {
    AOS.init();
    AOS.refresh();

    //Typed.Js
    const typed = new Typed(TypedText.current, {
      strings: [
        "connect.",
        "explore.",
        "learn.",
        "discover.",
        "hire.",
        "be hired.",
        "collaborate.",
      ],
      typeSpeed: 150,
      loop: true,
      loopCount: Infinity,
      smartBackspace: true,
      backDelay: 1400,
      shuffle: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  //Header animation
  const HeaderText = useRef();
  useLayoutEffect(() => {
    gsap.to(HeaderText.current, { duration: 1.5, x: "0%", ease: "bounce" });
  });

  //Nav animation
  const NavBar = useRef();
  useLayoutEffect(() => {
    gsap.to(NavBar.current, { y: "0%", opacity: "1" }).delay(0.5);
  });

  //Text animation
  const MainText = useRef();
  useLayoutEffect(() => {
    gsap
      .to(MainText.current, { duration: 2, opacity: "1", ease: "power3" })
      .delay(1);
  });

  //Image animation - desktop
  const DesktopImageRef = useRef();
  useLayoutEffect(() => {
    gsap.to(DesktopImageRef.current, {
      duration: 1.5,
      scale: 1,
      ease: "power3",
    });
  });

  //TextBox animation
  const EmailField = useRef();
  useLayoutEffect(() => {
    gsap.to(EmailField.current, {
      duration: 2,
      y: 0,
      opacity: "1",
      ease: "elastic",
    });
  });

  //Button Animation animation
  const RequestButton = useRef();
  useLayoutEffect(() => {
    gsap.to(RequestButton.current, {
      duration: 2,
      y: 0,
      opacity: "1",
      ease: "elastic",
    });
  });

  //Text Effect
  useEffect(() => {
    const emailRegex =
      /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!Email.match(emailRegex) && Email.length <= 6 && Email.length !== 0) {
      setStatus({
        Error: true,
        Loading: false,
        Success: false,
        Text: "Not a valid email address 😐",
      });
    }

    if (!Email.match(emailRegex) && Email.length > 6 && Email.length !== 0) {
      setStatus({
        Error: true,
        Loading: false,
        Success: false,
        Text: "Still not a valid email address 🧐",
      });
    }

    //If the email is blank
    if (Email.length === 0) {
      setStatus({
        Error: false,
        Loading: false,
        Success: false,
        Text: "",
      });
    }

    //If the email is a valid email
    if (Email.match(emailRegex)) {
      setStatus({
        Error: false,
        Loading: false,
        Success: false,
        Text: "",
      });
    }
  }, [Email]);

  //Form handler
  const FormHandler = async (e) => {
    e.preventDefault();
    //Get captcha token
    const Token = await CaptchaRef.current.executeAsync();
    CaptchaRef.current.reset();

    //Set the loading state
    setStatus({
      Error: false,
      Loading: true,
      Success: false,
      Text: "",
    });

    const Body = {
      email: Email,
      token: Token,
    };
    const url = `${
      process.env.REACT_APP_API_URL || "http://localhost:4200"
    }/user/add`;

    axios
      .post(url, Body)
      .then((res) => {
        setStatus({
          ...Status,
          Loading: false,
        });
        setModal({
          ...Modal,
          Success: true,
          Text: "Amazing! You are now on the list! Don't forget to share with your friends 🎉",
        });

        resetModal(5000);
      })
      .catch((err) => {
        setStatus({
          ...Status,
          Loading: false,
        });
        setModal({
          ...Modal,
          Error: true,
          Text: err.response.data.message,
        });
        resetModal(4000);
      });
  };

  return (
    <>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_SITE_KEY}
        size="invisible"
        ref={CaptchaRef}
      />
      <div className="w-[90%] md:w-[80%] xl:w-4/5 2xl:w-5/6 mx-auto">
        <nav
          className="flex justify-between items-center mx-auto w-[96%] lg:w-full mt-[5vh] lg:mt-10 opacity-0 translate-y-[-10rem]"
          ref={NavBar}
        >
          <img src={Header} alt="header" className="h-6 lg:h-7" />
          <a
            href="https://twitter.com/frikax"
            target="_blank"
            rel="noreferrer"
            className="bg-primary text-primary bg-opacity-30 text-lg lg:text-xl p-2 rounded-lg hover:scale-95"
          >
            <FaTwitter />
          </a>
        </nav>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:space-x-[10vw] 2xl:space-x-[13vw] mt-8 lg:mt-10 py-4">
          <div className="w-full px-1">
            <h1
              className="text-center lg:text-left text-2xl lg:text-5xl font-bold lg:font-bold tracking-wide py-3 HeaderText translate-x-[-100%]"
              ref={HeaderText}
            >
              The <span className="text-primary">All-In-One</span> Social Media
              For Techies
            </h1>
            <p
              className="w-[90%] lg:w-full mx-auto text-neutral-300 text-[11px] lg:text-sm my-8 lg:mt-8 text-center lg:text-left font-normal leading-normal tracking-wider opacity-0"
              ref={MainText}
            >
              We are currently building the ONE community (some might call it
              social media) app you'll ever need as a Techie; newbie or pro!{" "}
              <span className="text-primary font-medium">
                Join the wait-list
              </span>{" "}
              to be one of the first few people to participate in our closed
              beta when we're live!
            </p>

            <form onSubmit={FormHandler}>
              <div
                className="w-full py-2 px-6 bg-neutral-700 text-sm mt-14 lg:mt-10 translate-y-[100vh] rounded-xl lg:rounded-t-xl lg:rounded-b-none"
                ref={EmailField}
              >
                <span className="text-[10px] lg:text-xs text-neutral-300 font-medium">
                  e-Mail address
                </span>
                <input
                  type="text"
                  className="w-full pb-2 pt-1 lg:py-2 bg-transparent font-light text-[15px] focus:outline-none placeholder-neutral-500"
                  value={Email}
                  placeholder="enter email address..."
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {Status.Error && (
                <div className="text-left text-red-600 lg:bg-red-600 lg:bg-opacity-10 font-medium text-xs md:text-sm py-2 lg:py-3 px-2 lg:px-3 lg:text-center">
                  {Status.Text}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary hover:bg-secondary hover:text-black text-white text-sm font-normal py-4 lg:py-5 mt-6 lg:mt-0 rounded-xl lg:rounded-b-xl lg:rounded-t-none translate-y-[100vh]"
                ref={RequestButton}
                // disabled={Email.length === 0 ? true : false}
              >
                Request Access
              </button>
            </form>
          </div>

          <div className="bg-primary-gray w-full lg:bg-transparent">
            <img
              src={All}
              alt="All"
              className="hidden lg:block scale-0"
              ref={DesktopImageRef}
            />
          </div>
        </div>
      </div>

      {/* MOBILE DISPLAY */}
      <div className="relative lg:hidden block mt-[40vh] min-h-[90vh] bg-[#1A1A1A] py-2">
        <img
          src={Mobile}
          alt="Mobile"
          className="w-[50%] md:w-[25%] lg:w-[40%] object-contain absolute left-0 right-0 mx-auto imageBounce"
        />

        <div className="mt-[70%] w-[90%] mx-auto text-center">
          <h1
            className="w-[70%] mx-auto text-4xl font-semibold"
            data-aos="fade-down"
          >
            Get ready to
            <br />
            <span className="text-primary inline-block" ref={TypedText}></span>
          </h1>

          <div className="mt-[9vh]">
            <RightText>
              Meet and connect with people within and outside your niche easily
              and quickly.
            </RightText>

            <LeftText>
              Share your ingenious ideas & collaborate with other Techies.
            </LeftText>

            <RightText>
              Create a portfolio to show off your amazing work using any of our
              FREE themes.
            </RightText>

            <LeftText>
              Hire talented Techies or be hired for real PAID full-time,
              contract or freelance jobs.
            </LeftText>

            <RightText>
              Learn from other Techies' or take complete text and video courses
              available on Frikax.
            </RightText>
          </div>

          <div className="pt-[4vh] pb-[6vh] px-2">
            <p className="text-[#b0b0b0] text-left text-[12px] tracking-wide font-light">
              <img
                src={Header}
                alt="header"
                className="h-6 object-contain mb-3"
              />
              &copy; {Year} Breege Technologies
            </p>
          </div>
        </div>
      </div>

      {/* DESKTOP DISPLAY */}
      <div className="relative hidden lg:block mt-[20vh] py-2">
        <div className="grid grid-cols-2 gap-10 h-full items-center">
          <div className="bg-neutral-800 rounded-r-[50%] h-full py-[15%] border-dashed border-r-2 border-t-2 border-b-2 border-neutral-500">
            <img
              src={Mobile}
              alt="Mobile"
              className="w-[40%] object-contain mx-auto"
            />
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-[75%]">
              <RightTextBig>
                Meet and connect with people within and outside your niche
                easily and quickly.
              </RightTextBig>

              <LeftTextBig>
                Share your ingenious ideas & collaborate with other Techies.
              </LeftTextBig>

              <RightTextBig>
                Create a portfolio to show off your amazing work using any of
                our FREE themes.
              </RightTextBig>

              <LeftTextBig>
                Hire talented Techies or be hired for real PAID full-time,
                contract or freelance jobs.
              </LeftTextBig>

              <RightTextBig>
                Learn from other Techies' or take complete text and video
                courses available on Frikax.
              </RightTextBig>
            </div>
          </div>
        </div>
        <div className="py-[8vh] flex justify-evenly items-center">
          <img src={Header} alt="header" className="h-6 object-contain mb-3" />
          <p className="text-[#b0b0b0] text-left text-[14px] tracking-wide font-light">
            &copy; {Year} Breege Technologies
          </p>
        </div>
      </div>

      {Status.Loading && <Loader />}
      <Success text={Modal.Text} visible={Modal.Success} />
      <Error text={Modal.Text} visible={Modal.Error} />
    </>
  );
}

export default App;
