import React from 'react';

import img from '../assets/image/choose.jpg'
import ChooseFeature from './ChooseFeature';
const Choose = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
      {/* Left Content */}
      <div>
        <p className="bg-emerald-100 text-emerald-600 font-medium inline-block px-4 py-1 rounded-full mb-4">
          WHY CHOOSE US
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Creating A Community Of <br />
          Life Long{" "}
          <span className="relative inline-block">
            Learners
            
          </span>
          .
        </h2>

        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris.
        </p>

        {/* Features Grid */}
        <ChooseFeature/>
      </div>

      {/* Right Image */}
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-full h-full border-l-[6px] border-t-[6px] border-emerald-500 rounded-tr-3xl rounded-bl-3xl z-0"></div>
        <img
          src={img}
          alt="Student studying"
          className="relative rounded-2xl shadow-lg w-full h-140 object-cover"
        />
      </div>
    </section>
    );
};

export default Choose;