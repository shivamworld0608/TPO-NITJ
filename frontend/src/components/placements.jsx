import React from 'react';

const Placements = () => {
  const statsClick = () => {
    console.log('Stats clicked');
  };

  const processClick = () => {
    console.log('Process clicked');
  };

const policyClick = () => {
    console.log('Policy clicked');
  };

  return (
    <div className="grid grid-cols-2 m-[5%] lg:grid-cols-4 gap-8 max-w-4xl lg:mx-auto">
      <a
        href="/courses"
        className="group transition delay-100 duration-300 hover:cursor-pointer hover:shadow-2xl hover:bg-sky-400 hover:shadow-sky-500 hover:scale-110 flex flex-col space-y-4 items-center justify-center w-full h-full px-3 py-5 bg-white shadow shadow-gray-400 rounded-xl"
      >
        <div className="flex flex-col space-y-4 items-center justify-center">
          <span
            className="group-hover:text-white group-hover:animate-bounce animate-delay material-symbols-outlined"
            style={{ fontSize: '48px' }}
          >
            Icon
          </span>
          <p className="group-hover:text-white text-lg lg:text-xl whitespace-nowrap text-center text-dark-purple uppercase">
            Department Wise
          </p>
        </div>
      </a>

      <div
        className="group transition delay-100 duration-300 hover:cursor-pointer hover:shadow-2xl hover:bg-sky-400 hover:shadow-sky-500 hover:scale-110 flex flex-col space-y-4 items-center justify-center w-full h-full px-3 py-5 bg-white shadow shadow-gray-400 rounded-xl"
        onClick={statsClick}
      >
        <div className="flex flex-col space-y-4 items-center justify-center">
          <span
            className="group-hover:text-white group-hover:animate-bounce animate-delay material-symbols-outlined"
            style={{ fontSize: '48px' }}
          >
            Icon
          </span>
          <p className="group-hover:text-white text-lg lg:text-xl whitespace-nowrap text-center text-dark-purple uppercase">
            Company Wise
          </p>
        </div>
      </div>

      <div
        className="group transition delay-100 duration-300 hover:cursor-pointer hover:shadow-2xl hover:bg-sky-400 hover:shadow-sky-500 hover:scale-110 flex flex-col space-y-4 items-center justify-center w-full h-full px-3 py-5 bg-white shadow shadow-gray-400 rounded-xl"
        onClick={processClick}
      >
        <div className="flex flex-col space-y-4 items-center justify-center">
          <span
            className="group-hover:text-white group-hover:animate-bounce animate-delay material-symbols-outlined"
            style={{ fontSize: '48px' }}
          >
            Icon
          </span>
          <p className="group-hover:text-white text-lg lg:text-xl whitespace-nowrap text-center text-dark-purple uppercase">
             Tech/Non-Tech
          </p>
        </div>
      </div>

      <div
        className="group transition delay-100 duration-300 hover:cursor-pointer hover:shadow-2xl hover:bg-sky-400 hover:shadow-sky-500 hover:scale-110 flex flex-col space-y-4 items-center justify-center w-full h-full px-3 py-5 bg-white shadow shadow-gray-400 rounded-xl"
        onClick={policyClick}
      >
        <div className="flex flex-col space-y-4 items-center justify-center">
          <span
            className="group-hover:text-white group-hover:animate-bounce animate-delay material-symbols-outlined"
            style={{ fontSize: '48px' }}
          >
            Icon
          </span>
          <p className="group-hover:text-white text-lg lg:text-xl whitespace-nowrap text-center text-dark-purple uppercase">
            Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Placements;
