import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function HeroSection() {
  const images = ["_DSC0023.jpg", "_DSC0031.jpg", "_DSC0092.jpg"];
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
        setCurrentImageIndex((prevIndex) => (prevIndex + 1)%3);
        setFadeIn(true);
      }, 0);
    }, 5000);

    return () => {
      clearTimeout(slideInTimer);
      clearInterval(visibilityInterval);
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <>
      <div className="relative overflow-hidden flex flex-col items-center justify-center h-[100vh]">
        <div className="absolute grid grid-cols-2 top-0 left-0 right-0 bottom-0">
          <div
            className={`relative gate1 w-full h-full bg-white z-[1000] transition-all duration-[1s] ${
              slideIn
                ? "opacity-0 -translate-x-full"
                : "translate-x-0"
            }`}
          >
            <p className={`absolute right-0 top-1/2 text-5xl font-extrabold text-[#111] p-2 transition-all duration-300 ${
              slideIn
                ? "opacity-0 -translate-x-full"
                : "translate-x-0"
            }`}>
              TPO
            </p>
          </div>
          <div
            className={`relative gate2 h-full bg-white z-[1000] transition-all duration-[1s]  ${
              slideIn
                ? "opacity-0 translate-x-full"
                : "translate-x-0"
            }`}
          >
            <p className={`absolute left-0 top-1/2 text-5xl font-extrabold text-[#111] p-2 transition-all duration-300 ${
              slideIn
                ? "opacity-0 translate-x-full"
                : "translate-x-0"
            }`}>
              NITJ
            </p>
          </div>
        </div>
        <div
          className={`heroSection w-full sm:h-[100vh] h-[100vh] transition-opacity duration-1000`}
        >
            {images.map((img, i) => (
                <motion.img
                    key={i}
                    src={img}
                    alt={`Slide ${i + 1}`}
                    className="absolute w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: i === currentImageIndex ? 1 : 0 }}
                    transition={{ duration: 1,bounce:100,damping:100 }}
                />
            ))}
        </div>
        <div className={`absolute inset-0 bg-black backdrop-blur-lg ${fadeIn ? "opacity-50" : "opacity-0"}`}></div>
        <div className="absolute text flex flex-col gap-8 items-center justify-center p-10 text-white">
          <motion.div key={1001} initial={{opacity:0,translateY: "100%"}} animate={{opacity:1,translateY: 0}}  transition={{ duration: 0.5, ease: "easeOut",delay:1 }} className="flex sm:flex-row flex-col items-center sm:text-5xl text-4xl gap-1">
            <span className="font-extrabold ">Welcome to </span>
            <div className="flex">
              <span className="font-extrabold ">TPO-</span>
              <span className="text-[#205781] font-extrabold ">NITJ</span>
            </div>
          </motion.div>
            <motion.div key={1002} initial={{opacity:0,translateY: "100%"}} animate={{opacity:1,translateY: 0}}  transition={{ duration: 0.5, ease: "easeOut",delay:1.2 }} >
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
            </motion.div>
          <motion.div key={1003} initial={{opacity:0,translateY: "100%"}} animate={{opacity:1,translateY: 0}}  transition={{ duration: 0.5, ease: "easeOut",delay:1.5 }} className="buttons flex gap-5">
            <button
              className="button text-white font-medium p-3 rounded-md z-0 border-[1.5px] border-white"
              onClick={() => {
                navigate("/login")
              }}
            >
              Register Now
            </button>
          </motion.div>
        </div>
      </div>
      <style jsx>
        {`
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
            transition: .25s all;
            padding: 8px 30px;
          }

          .button:hover {
            color: #000;
            background:#fff;
            box-shadow: 0 0 0 .2rem #fff;
          }
        `}
      </style>
    </>
  );
}

export default HeroSection;
