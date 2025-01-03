import React, { useState } from 'react';
import { FaHome } from "react-icons/fa";

const FAQ = () => {
  console.log("Rendering FAQ component");
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("Rendering FAQ component");

  const handleOpenModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form");
    // Add form submission logic here
    handleCloseModal();
  };

  return (
    <div className="faq-page bg-gradient-to-b min-h-screen relative">
      {console.log("Rendering Header section")}
      {/* Header */}
      <header className="faq-header bg-gradient-to-r to-gray-900 py-4 px-6 flex flex-col mb-2">
      <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center tracking-wide">
        Welcome to
        <span className="bg-custom-blue text-transparent bg-clip-text">
          {" "}FAQ's
        </span>
      </h1>
      </header>

      {console.log("Rendering Main Content")}
      {/* Main Content */}
      <div className="flex flex-wrap justify-center gap-11 m-[3%] max-w-10xl lg:mx-auto">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow shadow-sky-500 px-3 py-5">
          <div className="flex flex-col space-y-2">
            <h5 className="font2 text-xl font-bold text-black m-0">
              Can a student with backlogs be allowed to take six months
              internship?
            </h5>
            <p
              className="font2 text-sm text-gray"
              style={{ margin: 0, color: "grey" }}
            >
              (Student)
            </p>
            <span className="text-lg font2 font-bold text-sky-500">Answer</span>
            <p className="font2 text-sm text-black">
              "Students who want to avail 6-months internship during their 8th
              semester must not have more than 3 backlogs."
            </p>
          </div>
        </div>
        {/* Repeat the above card for additional cards */}

        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow shadow-sky-500 px-3 py-5">
          <div className="flex flex-col space-y-2">
            <h5 className="font2 text-xl font-bold text-black m-0">
              Can a student with backlogs be allowed to take six months
              internship?
            </h5>
            <p
              className="font2 text-sm text-gray"
              style={{ margin: 0, color: "grey" }}
            >
              (Student)
            </p>
            <span className="text-lg font2 font-bold text-sky-500">Answer</span>
            <p className="font2 text-sm text-black">
              "Students who want to avail 6-months internship during their 8th
              semester must not have more than 3 backlogs."
            </p>
          </div>
        </div>

        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow shadow-sky-500 px-3 py-5">
          <div className="flex flex-col space-y-2">
            <h5 className="font2 text-xl font-bold text-black m-0">
              Can a student with backlogs be allowed to take six months
              internship?
            </h5>
            <p
              className="font2 text-sm text-gray"
              style={{ margin: 0, color: "grey" }}
            >
              (Student)
            </p>
            <span className="text-lg font2 font-bold text-sky-500">Answer</span>
            <p className="font2 text-sm text-black">
              "Students who want to avail 6-months internship during their 8th
              semester must not have more than 3 backlogs."
            </p>
          </div>
        </div>

        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow shadow-sky-500 px-3 py-5">
          <div className="flex flex-col space-y-2">
            <h5 className="font2 text-xl font-bold text-black m-0">
              Can a student with backlogs be allowed to take six months
              internship?
            </h5>
            <p
              className="font2 text-sm text-gray"
              style={{ margin: 0, color: "grey" }}
            >
              (Student)
            </p>
            <span className="text-lg font2 font-bold text-sky-500">Answer</span>
            <p className="font2 text-sm text-black">
              "Students who want to avail 6-months internship during their 8th
              semester must not have more than 3 backlogs."
            </p>
          </div>
        </div>

        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow shadow-sky-500 px-3 py-5">
          <div className="flex flex-col space-y-2">
            <h5 className="font2 text-xl font-bold text-black m-0">
              Can a student with backlogs be allowed to take six months
              internship?
            </h5>
            <p
              className="font2 text-sm text-gray"
              style={{ margin: 0, color: "grey" }}
            >
              (Student)
            </p>
            <span className="text-lg font2 font-bold text-sky-500">Answer</span>
            <p className="font2 text-sm text-black">
              "Students who want to avail 6-months internship during their 8th
              semester must not have more than 3 backlogs."
            </p>
          </div>
        </div>

        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow shadow-sky-500 px-3 py-5">
          <div className="flex flex-col space-y-2">
            <h5 className="font2 text-xl font-bold text-black m-0">
              Can a student with backlogs be allowed to take six months
              internship?
            </h5>
            <p
              className="font2 text-sm text-gray"
              style={{ margin: 0, color: "grey" }}
            >
              (Student)
            </p>
            <span className="text-lg font2 font-bold text-sky-500">Answer</span>
            <p className="font2 text-sm text-black">
              "Students who want to avail 6-months internship during their 8th
              semester must not have more than 3 backlogs."
            </p>
          </div>
        </div>



        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow shadow-sky-500 px-3 py-5">
          <div className="flex flex-col space-y-2">
            <h5 className="font2 text-xl font-bold text-black m-0">
              Can a student with backlogs be allowed to take six months
              internship?
            </h5>
            <p
              className="font2 text-sm text-gray"
              style={{ margin: 0, color: "grey" }}
            >
              (Student)
            </p>
            <span className="text-lg font2 font-bold text-sky-500">Answer</span>
            <p className="font2 text-sm text-black">
              "Students who want to avail 6-months internship during their 8th
              semester must not have more than 3 backlogs."
            </p>
          </div>
        </div>

        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow shadow-sky-500 px-3 py-5">
          <div className="flex flex-col space-y-2">
            <h5 className="font2 text-xl font-bold text-black m-0">
              Can a student with backlogs be allowed to take six months
              internship?
            </h5>
            <p
              className="font2 text-sm text-gray"
              style={{ margin: 0, color: "grey" }}
            >
              (Student)
            </p>
            <span className="text-lg font2 font-bold text-sky-500">Answer</span>
            <p className="font2 text-sm text-black">
              "Students who want to avail 6-months internship during their 8th
              semester must not have more than 3 backlogs."
            </p>
          </div>
        </div>
      </div>

      {console.log("Rendering Ask Question Button")}
      {/* Ask Question Button */}
      <button
        className="faq-button bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:opacity-90 fixed bottom-6 right-6 z-10"
        onClick={handleOpenModal}
      >
        Ask New Question
      </button>

      {isModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="modal-content bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-2xl font-bold mb-4">Ask a New Question</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700">Your Question</label>
              <textarea
                id="question"
                name="question"
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;