import { FaEdit, FaTrash } from "react-icons/fa";
import useAppointmentsByEmail from "../../hooks/useAppointmentsByEmail";
import { Link } from "react-router-dom";
import useTestsById from "../../hooks/useTestsById";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import moment from "moment/moment";


const UpcomingAppointments = () => {
    const [allApoint = appointments, refetch] = useAppointmentsByEmail();
    const axiosSecure = useAxiosSecure();

    
    const appointments = allApoint.filter( appointment => {
        const today = new Date();
        const appointmentDate = new Date(appointment.testDate);
        return appointmentDate > today;
    });



    const handleCancelAppointment = (appointment) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning', 
            showCancelButton: true,
            confirmButtonColor: '#3085d6', 
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/payments/${appointment._id}`);
                    refetch();
                    Swal.fire(
                        'Cancelled!',
                        'Your appointment has been cancelled.',
                        'success'
                    )
                } catch (error) {
                    Swal.fire(
                        'Cancelled!',
                        'Your appointment has been cancelled.',
                        'success'
                    )
                }
            }
        })
    }

    return (
        <div>
            <div className="my-4 mx-auto text-center">
                <h1 className="text-3xl">Upcoming Appointments</h1>
            </div>
            <div className="my-4">
                <h2 className="text-xl">Total Appointments : {allApoint.length}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Test Name</th>
                        <th>Transaction id</th>
                        <th>Test Date</th>
                        <th>Paid</th>
                        <th>Payment Date</th>
                        <th>Cancel</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* body */}
                    {
                        allApoint.map( (appointment, index) => (
                            <tr key={appointment._id}>
                                <th>{index + 1}</th>
                                <td>{appointment.testName}</td>
                                <td>{appointment.transactionId}</td>
                                <td>{appointment.testDate}</td>
                                <td>${appointment.price}</td>
                                <td>{appointment.date.split('T')[0]}
                                    <br/>
                                    {appointment.date.split('T')[1].split('.')[0]}
                                </td>
                                
                                <td ><button
                                    onClick={() => handleCancelAppointment(appointment)}
                                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full'
                                    >
                                        {/* <FaTrash className='text-red-600'></FaTrash> */}
                                        cancel
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UpcomingAppointments;