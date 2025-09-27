import React from 'react';
import { BsShieldLock } from 'react-icons/bs';
import {  FaTags } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa6';
import { MdEventAvailable } from 'react-icons/md';

const Feature = () => {
    const features=[
        {
            icon:<FaUserGraduate className='text-black-500 text-4xl '/>,
            title:"Empower Teachers",
            description:"Every teacher in our platform is a certified graduate and talented."
        },
        {
            icon:<MdEventAvailable className='text-black-500 text-4xl'/>,
            title:"All Course available here",
            description:"Our courses are fully customizable, giving you the freedom to learn your way."
        },
        {
            icon:<FaTags className='text-black-500 text-4xl'/>,
            title:"Daily Offers",
            description:"Exclusive discounts and special deals available every day."
        },
        {
            icon:<BsShieldLock className='text-black-500 text-4xl'/>,
            title:"100% Secure Payment",
            description:"Your Payment information is encrypted and completely secure"
        }
    ]
    return (
        <section className='px-8 py-15'>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10'>
                {features.map((feature,index)=>(
                   <div key={index} className='flex flex-col items-center text-center'>
                    {feature.icon}
                    <h1 className='text-lg font-semibold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block'>{feature.title}</h1>
                    <p className='text-gray-500 text-sm'>{feature.description}</p>

                   </div>
                ))}

            </div>

        </section>
    );
};

export default Feature;