import React from 'react';

const Filter = ({handleSearchQuery,searchquery,departments,filterdept, handleFilter}) => {
    return (
<div className='flex flex-col lg:flex-row'>
        

        <div className=' bg-white p-4 rounded-lg shadow  '>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
            </label>
            <label className="input input-info rounded">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
                >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input 
            type="search" 
            value={searchquery}
                onChange={(e)=>handleSearchQuery(e.target.value)}
            required placeholder="Search"
              aria-label="Search courses" />
            </label>
        </div>
         <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
            </label>
            <select className="w-full p-2 border rounded-md"
             value={filterdept}
             onChange={(e)=> handleFilter(e.target.value)}
             >
              <option value="">All Categories</option>
              {departments?.map(category=>(
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
              
            </select>
          </div>
        </div>
        
    );
};

export default Filter;