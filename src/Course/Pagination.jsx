import React from 'react';

const Pagination = ({ totalPages, currentPage, handleSetPage}) => {
    return (
         <div className="flex justify-center items-center mt-4 mb-6">
           {Array.from({length:totalPages},(_,i)=>(
             <button onClick={()=> handleSetPage(i+1)} className={`mx-1 px-3 py-1 rounded ${currentPage === i+1 ? "bg-primary text-white":"bg-gray-200"}`} key={i}>{i+1}</button>
           ))}
        </div>
    );
};

export default Pagination;