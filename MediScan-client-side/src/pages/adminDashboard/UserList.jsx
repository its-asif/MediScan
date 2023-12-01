import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../shared/SectionTitle";
import Swal from "sweetalert2";
import { useState } from "react";
import useUser from "../../hooks/useUser";

const UserList = () => {
    const axiosSecure = useAxiosSecure();
    const [users , refetch] = useUser();
    // console.log(users)

    const [viewUser, setViewUser] = useState({});

    const handleChangeRole = async (id) => {
        axiosSecure.patch(`/users/admin/${id}`)
        .then(res => {
            // console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position : "center",
                    icon : "success",
                    title: 'Role Updated',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            refetch();
        })
    }

    const handleChangeStatus = async (id) => {
        axiosSecure.patch(`/users/active/${id}`)
        .then(res => {
            // console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position : "center",
                    icon : "success",
                    title: 'Status Updated',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            refetch();
        })
    }

    const handleViewUser = async (user) => {
        setViewUser(user);
        document.getElementById('my_modal_2').showModal();
    }

    return (
        <div>
{/* Modal */}
            <dialog id="my_modal_2" className="modal">
            <div className="modal-box p-0">
            <div className="bg-white shadow-lg rounded-2xl w-full mx-auto  dark:bg-gray-800">
                <img alt="profil" src="https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?w=740&t=st=1700904260~exp=1700904860~hmac=43bb5c07a0cf49886d3b90b9968658932e7a07f42d27d2cf666ac32b05a697fd" className="w-full mb-4 rounded-t-lg h-36"/>
                <div className="flex flex-col items-center justify-center p-4 -mt-16">
                    <div className="relative block">
                        <img alt="profile" src={viewUser?.photoURL} className="mx-auto object-cover rounded-full h-20 w-20  border-2 border-white dark:border-gray-800"/>
                    </div>
                    <p className="mt-2 text-2xl font-medium text-gray-800 dark:text-white">
                        {viewUser?.name}
                    </p>
                    <p className="mb-4 text-sm text-gray-400">
                        User Status : {viewUser?.isAdmin ? 'Admin' : 'General User'}
                    </p>
                    <p className="p-2 px-4 text-base text-white bg-pink-500 rounded-full">
                        {viewUser?.email}
                    </p>
                    <div className="w-full p-2 mt-4 rounded-lg">
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
                            <p className="flex flex-col">
                                Blood Group
                                <span className="font-bold text-black dark:text-white text-center">
                                    {viewUser?.bloodGroup}
                                </span>
                            </p>
                            <p className="flex flex-col">
                                District
                                <span className="font-bold text-black dark:text-white">
                                    {viewUser?.district}
                                </span>
                            </p>
                            <p className="flex flex-col">
                                Upazila
                                <span className="font-bold text-black dark:text-white">
                                    {viewUser?.upazila}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>


            <h1 className="text-2xl mb-6"> Total User : {users.length}</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
{/* Table Heading */}
                    <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Name
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Email
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Role
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Status
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Salary
                        </th>
                        <th className="px-4 py-2"></th>
                    </tr>
                    </thead>

{/* Table Body */}
                    <tbody className="divide-y divide-gray-200">
                    {
                        users.map(user => 
                            <tr key={user._id} className="text-center">
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {user.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>

                                <td className="whitespace-nowrap px-4 py-2">
                                    <button
                                        onClick={ () => handleChangeRole(user._id)}
                                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                    >
                                        {user.isAdmin? 'Admin' : 'User'}
                                    </button>
                                </td>

                                <td className="whitespace-nowrap px-4 py-2">
                                    <button
                                        onClick={ () => handleChangeStatus(user._id)}
                                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                    >
                                        {user.active? 'Active' : 'Blocked'}
                                    </button>
                                </td>

                                <td className="whitespace-nowrap px-4 py-2">
                                <button
                                    onClick={ () => handleViewUser(user)}
                                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                >
                                    See Info
                                </button>
                                </td>
                            </tr>
                        )
                    }

                    </tbody>
                </table>
                </div>
        </div>
    );
};

export default UserList;