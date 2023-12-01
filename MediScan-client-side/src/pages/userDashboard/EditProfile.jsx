// Import necessary libraries
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const EditProfile = () => {
    const { user } = useAuth();
    const { email } = user;
    const axiosSecure = useAxiosSecure();

    const [userData, setUserData] = useState({
        name: '',
        bloodGroup: '',
        district: '',
        upazila: '',
        photoURL: '',
    });

    useEffect(() => {
        axiosSecure.get(`/users/${email}`)
            .then(res => {
                setUserData(res.data[0]);
            })
    }, [user, email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(userData)
        try {
            const response = await axiosSecure.patch(`/users/${email}`, userData);
            console.log('Updated User Data:', response.data);
            Swal.fire(
                'Updated!',
                'Your profile has been updated.',
                'success'
            )
        } catch (error) {
            console.error('Error updating user data:', error);
            // Handle error, show an error message, etc.
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Display Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Blood Group:
                    </label>
                    <input
                        type="text"
                        name="bloodGroup"
                        value={userData.bloodGroup}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        District:
                    </label>
                    <input
                        type="text"
                        name="district"
                        value={userData.district}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Upazila:
                    </label>
                    <input
                        type="text"
                        name="upazila"
                        value={userData.upazila}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Photo URL:
                    </label>
                    <input
                        type="text"
                        name="photoURL"
                        value={userData.photoURL}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
