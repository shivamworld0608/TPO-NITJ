import React from "react";
import { use } from "react";
import { useEffect, useState } from "react";
function HeroSection() {
  const images = ["/NITJ_Pic1.png", "/NITJ_Pic3.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
    const [slideIn, setSlideIn] = useState(false)
  useEffect(() => {
    setInterval(() => {
    setSlideIn(true)

    },500)
    const interval = setInterval(() => {
      setFadeIn(false);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="relative overflow-x-hidden flex flex-col items-center justify-center">
        <div className="absolute grid grid-cols-2 top-0 left-0 right-0 bottom-0">
          <div className={`relative gate1 w-full h-screen bg-white z-[1000] transition-all duration-700 ${slideIn?"rounded-t-[100px] opacity-0 -translate-x-full":"rounded-none translate-x-0"}`}>
            <p className="absolute right-0 top-1/2 text-5xl font-extrabold p-2">
              TPO
            </p>
          </div>
          <div className={`relative gate2 w-full h-screen bg-white z-[1000] transition-all duration-700  ${slideIn?"rounded-t-[100px] opacity-0 translate-x-full":"rounded-none translate-x-0"}`}>
            <p className="absolute left-0 top-1/2 text-5xl font-extrabold text-sky-700 p-2">
              NITJ
            </p>
          </div>
        </div>
        <div
          className={`w-full h-screen transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-lg"></div>
        <div className="absolute text flex flex-col gap-3 items-center justify-center p-10 text-white">
          <div>
            <span className="font-extrabold sm:text-4xl text-3xl">Welcome to TPO-</span>
            <span className="text-sky-600 font-extrabold sm:text-4xl text-3xl">NITJ</span>
          </div>
          <div className="sm:text-lg text-sm text-center">Empowering Your Career Journey!</div>
          <div className="sm:text-lg text-sm text-center">
            "Your bridge to internships, training programs, and dream jobs."
          </div>
          <div className="buttons flex gap-5">
            <button className="bg-sky-700 text-white font-medium p-3 rounded-xl z-0">
              <a href="/signup">Register Now</a>
            </button>
            <button className="bg-sky-700 text-white font-medium p-3 rounded-xl z-0">
              Job Openings
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
              ) 0.55s;
          }

          @keyframes slider {
            0% {
              transform: translateY(-100%) rotate(30deg);
            }

            100% {
              transform: translateY(0%) rotate(0);
            }
          }

          button {
            position: relative;
            cursor: pointer;
            overflow: hidden;
            z-index: 100;
            transition: color 0.5s ease;
          }

          button::before {
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

          button:hover::before {
            left: 0;
          }

          button:hover {
            color: #0369a1;
          }

          
        `}
      </style>
    </>
  );
}

export default HeroSection;
