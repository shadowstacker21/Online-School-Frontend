import React from 'react';

import useAuthContext from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
const ProfileDetails = () => {
const {user} = useAuthContext();

    console.log(user);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600/10 to-purple-600/10 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 border-b pb-4 mb-4">
          <img
            src={user.profile_picture}
            alt={user.first_name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.first_name} <span className="capitalize badge badge-primary">{user.role}</span></h2>
            <p className="text-gray-600">{user.email}</p>
           
          </div>
          
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-pink-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <p><span className="font-medium">📍 Address:</span> {user.address}</p>
            <p><span className="font-medium">📞 Phone:</span> {user.phone_number}</p>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Account Details</h3>
            <p><span className="font-medium">Full Name:</span> {user.first_name} {user.last_name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p>
              <span className="font-medium">Account Status:</span>{" "}
              <span className="px-2 py-1 rounded text-white bg-green-500 text-xs">
                Verified
              </span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
            Delete Account
          </button>
          <Link to='/dashboard/update' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Edit Profile
          </Link>
          <Link to='/dashboard/password/change' className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
           Password Change?
          </Link>
        </div>
      </div>
    </div>
    );
};

export default ProfileDetails;