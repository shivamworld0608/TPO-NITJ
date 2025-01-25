import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function HeroSection() {
  const images = ["/_DSC0023.jpg", "_DSC0031.jpg","_DSC0092.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [slideIn, setSlideIn] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const slideInTimer = setTimeout(() => {
      setSlideIn(true);
    }, 500);

    const visibilityInterval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 3500);

    const imageInterval = setInterval(() => {
      setFadeIn(false);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true);
      }, 0);
    }, 5000);

    return () => {
      clearTimeout(slideInTimer);
      clearInterval(visibilityInterval);
      clearInterval(imageInterval);
    };
  }, [images.length]);

  return (
    <>
      <div className="relative overflow-hidden flex flex-col items-center justify-center lg:mt-0 -mt-10">
        <div className="absolute grid grid-cols-2 top-0 left-0 right-0 bottom-0">
          <div
            className={`relative gate1 w-full sm:h-[80vh] h-[50vh] bg-white z-[1000] transition-all duration-700 ${
              slideIn
                ? "rounded-t-[100px] opacity-0 -translate-x-full"
                : "rounded-none translate-x-0"
            }`}
          >
            <p className="absolute right-0 top-1/2 text-5xl font-extrabold p-2">
              TPO
            </p>
          </div>
          <div
            className={`relative gate2 sm:h-[80vh] h-[50vh] bg-white z-[1000] transition-all duration-700  ${
              slideIn
                ? "rounded-t-[100px] opacity-0 translate-x-full"
                : "rounded-none translate-x-0"
            }`}
          >
            <p className="absolute left-0 top-1/2 text-5xl font-extrabold text-sky-700 p-2">
              NITJ
            </p>
          </div>
        </div>
        <div
          className={`heroSection w-full sm:h-[80vh] h-[50vh] transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "scaling 6s linear infinite",
          }}
        ></div>
        <div className={`absolute inset-0 bg-black backdrop-blur-lg ${fadeIn ? "opacity-50" : "opacity-0"}`}></div>
        <div className="absolute text flex flex-col gap-8 items-center justify-center p-10 text-white">
          <div className="flex sm:flex-row flex-col items-center sm:text-5xl text-4xl gap-1">
            <span className="font-extrabold ">Welcome to </span>
            <div className="flex">
              <span className="font-extrabold ">TPO-</span>
              <span className="text-sky-600 font-extrabold ">NITJ</span>
            </div>
          </div>
          <div
            className={`message flex-col gap-2 ${visible ? "flex" : "hidden"}`}
          >
            <div className="sm:text-xl text-sm text-center">
              "Empowering Your Career Journey!"
            </div>
            <div className="sm:text-xl text-sm text-center">
              "Your bridge to internships, training programs, and dream jobs."
            </div>
          </div>
          <div
            className={`message flex-col gap-2 ${visible ? "hidden" : "flex"}`}
          >
            <div className="sm:text-xl text-sm text-center">
              "Unlocking Potential, Creating Success"
            </div>
            <div className="sm:text-xl text-sm text-center">
              "Strong industry connections and professional growth."
            </div>
          </div>
          <div className="buttons flex gap-5">
            <button
              className="bg-sky-700 button text-white font-medium p-3 rounded-xl z-0"
              onClick={() => {
                navigate("/Signup")
              }}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .text {
            animation: slider 0.7s
              linear(
                0 0%,
                0 2.27%,
                0.02 4.53%,
                0.04 6.8%,
                0.06 9.07%,
                0.1 11.33%,
                0.14 13.6%,
                0.25 18.15%,
                0.39 22.7%,
                0.56 27.25%,
                0.77 31.8%,
                1 36.35%,
                0.89 40.9%,
                0.85 43.18%,
                0.81 45.45%,
                0.79 47.72%,
                0.77 50%,
                0.75 52.27%,
                0.75 54.55%,
                0.75 56.82%,
                0.77 59.1%,
                0.79 61.38%,
                0.81 63.65%,
                0.85 65.93%,
                0.89 68.2%,
                1 72.7%,
                0.97 74.98%,
                0.95 77.25%,
                0.94 79.53%,
                0.94 81.8%,
                0.94 84.08%,
                0.95 86.35%,
                0.97 88.63%,
                1 90.9%,
                0.99 93.18%,
                0.98 95.45%,
                0.99 97.73%,
                1 100%
              )
              0.55s;
          }

          @keyframes slider {
            0% {
              transform: translateY(-100%) rotate(30deg);
            }

            100% {
              transform: translateY(0%) rotate(0);
            }
          }
          @keyframes scaling {
            0% {
              transform: scale(1);
            }

            100% {
              transform: scale(1.2);
            }
          }

          @keyframes animaeMsg {
            0% {
              transform: translateY(-10%);
              opacity: 0;
            }

            50% {
              transform: translateY(0%);
              opacity: 1;
            }

            100% {
              transform: translateY(10%);
              opacity: 0;
            }
          }
          .message {
            animation: animaeMsg 3.5s linear infinite;
          }
    
          .button {
            position: relative;
            cursor: pointer;
            overflow: hidden;
            z-index: 1;
            transition: color 0.5s ease;
          }

          .button::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background-color: white;
            z-index: -100;
            transition: left 0.5s ease;
          }

          .button:hover::before {
            left: 0;
          }

          .button:hover {
            color: #0369a1;
          }
        `}
      </style>
    </>
  );
}

export default HeroSection;
