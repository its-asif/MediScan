import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const MyProfile = () => {

    const {user, loading} = useAuth();
    const {displayName, email, photoURL} = user;
    const [userData, setUserData] = useState({});
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/users/${email}`)
            .then(res => {
                setUserData(res.data[0]);
            })
    }, [user])

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    return (
        <div>
            <Helmet>
                <title> MediScan | My Profile </title>
            </Helmet>
            <div className="bg-white shadow-lg rounded-2xl w-1/2 mx-auto mt-10 dark:bg-gray-800">
                <img alt="profil" src="https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?w=740&t=st=1700904260~exp=1700904860~hmac=43bb5c07a0cf49886d3b90b9968658932e7a07f42d27d2cf666ac32b05a697fd" className="w-full mb-4 rounded-t-lg h-36"/>
                <div className="flex flex-col items-center justify-center p-4 -mt-16">
                    <a href="#" className="relative block">
                        <img alt="profile" src={photoURL} className="mx-auto object-cover rounded-full h-20 w-20  border-2 border-white dark:border-gray-800"/>
                    </a>
                    <p className="mt-2 text-2xl font-medium text-gray-800 dark:text-white">
                        {displayName}
                    </p>
                    <p className="mb-4 text-sm text-gray-400">
                        User Status : {userData?.isAdmin ? 'Admin' : 'General User'}
                    </p>
                    <p className="p-2 px-4 text-base text-white bg-pink-500 rounded-full">
                        {email}
                    </p>
                    <div className="w-full p-2 mt-4 rounded-lg">
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
                            <p className="flex flex-col">
                                Blood Group
                                <span className="font-bold text-black dark:text-white text-center">
                                    {userData?.bloodGroup}
                                </span>
                            </p>
                            <p className="flex flex-col">
                                District
                                <span className="font-bold text-black dark:text-white">
                                    {userData?.district}
                                </span>
                            </p>
                            <p className="flex flex-col">
                                Upazila
                                <span className="font-bold text-black dark:text-white">
                                    {userData?.upazila}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-center p-4 border-t border-gray-300 dark:border-gray-700">
                    <Link to="/dashboard/editProfile">
                    <button className="text-pink-500 hover:underline focus:outline-none">
                        Edit Profile
                    </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default MyProfile;