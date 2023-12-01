import React from 'react';
import { Link } from 'react-router-dom';
import useActiveBanner from '../../hooks/useActiveBanner';

const Banner = () => {
    const banner = useActiveBanner();
    const activeBanner = banner[0][0];
    // console.log(activeBanner);

  return (
    <div>
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
            backgroundImage: `url(${activeBanner?.image})`,
        }}
      >
        <div className="absolute inset-0  bg-gradient-to-r from-black/80 via-black/50 to-black/10 "></div>

        <div className="relative   px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 w-1/2">
          <div className=" text-center ltr:sm:text-left rtl:sm:text-right text-white">
            <h1 className="text-6xl font-extrabold sm:text-6xl">
            {activeBanner?.title}
            </h1>

            <p className="mt-4  sm:text-3xl/relaxed">
            {activeBanner?.text}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center mx-auto">
              <Link to={'/allTestPage'}
                className="block w-full mx-auto rounded bg-[#ffa00d] px-12 py-3 text-lg font-medium text-white shadow hover:bg-[#cc990a] focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                See All Tests
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
