import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import useTests from "../../hooks/UseTests";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


const AllTests = () => {
    const axiosSecure = useAxiosSecure();
    const [tests, refetch] = useTests();
    const [appointments, setAppointments] = useState([]);


    useEffect(() => {
        console.log("Appointments length:", appointments.length);
    }, [appointments]);


    const handleDeleteTest = async (test) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning', 
            showCancelButton: true,
            confirmButtonColor: '#3085d6', 
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.isConfirmed) {
                
                const res = await axiosSecure.delete(`/tests/${test._id}`);
                console.log(res.data);
                if( res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                        title: `${test.name} deleted!`,
                        text: 'Your file has been deleted.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                
            }
          })    
    }

    // onclick view reservations it should open a modal with all the reservations for that test

    const handleViewAppointments =  (test) => {
        console.log(test);
        // setTestid(test?._id);

        axiosSecure.get(`/payments/test/${test._id}`)
        .then(res => {
            console.log(res.data);
            setAppointments(res.data);
        })
        .catch(err => console.log(err))
        
        document.getElementById('my_modal_2').showModal();
    }

    return (
        <div>
            {/* Modal */}
            <dialog id="my_modal_2" className="modal">
            <div className="modal-box p-0 max-w-screen-lg">
                {
                    appointments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Test ID</th>
                                    <th>Patient Email</th>
                                    <th>Paid Amount</th>
                                    <th>Reservation Date</th>
                                    <th>Reservation Time</th>
                                    <th>Reservation Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* body */}
                                {
                                    appointments.map( (appointment, index) => (
                                        <tr key={appointment._id}>
                                            <th>{index + 1}</th>
                                            <td>{appointment._id}</td>
                                            <td>${appointment.email}</td>
                                            <td>{appointment.price}</td>
                                            <td>{appointment.date.split('T')[0]}</td>
                                            <td>{appointment.date.split('T')[1].split('.')[0]}</td>
                                            <td>{appointment.status}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <h2>No Appointments Found!</h2>
                    )
                }
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>



            <div className="my-4">
                <h2 className="text-3xl">Total Tests : {tests.length}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Last Date</th>
                        <th>Slots</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View <br /> Reservations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* body */}
                    {
                        tests.map( (test, index) => (
                            <tr key={test._id}>
                                <th>{index + 1}</th>
                                <td>{test.name}</td>
                                <td>${test.price}</td>
                                <td>{test.date}</td>
                                <td>{test.slots}</td>
                                <td>
                                    {
                                        <Link to={`/dashboard/editTest/${test._id}`}><FaEdit className='text-green-600'></FaEdit></Link>
                                    }
                                </td>
                                <td ><button
                                    onClick={() => handleDeleteTest(test)}
                                    ><FaTrash className='text-red-600'></FaTrash></button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleViewAppointments(test)}
                                    >
                                    <FaUsers className='text-blue-600'></FaUsers>
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

export default AllTests;