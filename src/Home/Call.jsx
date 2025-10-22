import React from 'react';
import { Play, ArrowRight } from "lucide-react";
import img from '../assets/image/enroll1.jpg'

const Call = () => {
    return (
       <section className="relative bg-cover bg-center py-24 mb-10 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className='flex justify-center items-center'>
     <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side */}
        <div className="text-black max-w-xl">
          <p className="text-purple font-medium mb-2">Join Our New Session</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Call To Enroll Your Child
          </h1>
          <h2 className="text-3xl font-semibold mb-8">(+8801758423452)</h2>

          <button className="btn btn-primary hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition">
            Join With Us <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Side - Video Play */}
      <div>
        <img  src={img} alt="" />
      </div>
      </div>
      
        </div>
    </section>
    );
};

export default Call;