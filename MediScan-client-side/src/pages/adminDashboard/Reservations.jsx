import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Reservations = () => {
    const axiosSecure = useAxiosSecure();

    const { data: initialReservations = [], refetch, status } = useQuery({
        queryKey: 'payments',
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        },
    });

    const [reservations, setReservations] = useState(initialReservations);
    const [searchEmail, setSearchEmail] = useState('');
    const [testReportLink, setTestReportLink] = useState('');
    const [selectedReservationId, setSelectedReservationId] = useState('');

    useEffect(() => {
        
        setReservations(initialReservations);
    }, [initialReservations]);

    const handleSearch = () => {
        const filteredReservations = initialReservations.filter(reservation =>
            reservation.email.toLowerCase().includes(searchEmail.toLowerCase())
        );
        setReservations(filteredReservations);
    };

    const handleCancelReservation = async (reservationId) => {
        
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
                    await axiosSecure.delete(`/payments/${reservationId}`);
                    refetch();
                    Swal.fire(
                        'Cancelled!',
                        'Your appointment has been cancelled.',
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
        refetch();
    };

    const handleSubmitResult = async (reservationId) => {
        setSelectedReservationId(reservationId);
        document.getElementById('my_modal_2').showModal();
    };

    const handleSubmit= async ({ reservationId, testReportLink }) => {
        console.log(testReportLink);
        console.log(reservationId);

        try {
            await axiosSecure.patch(`/payments/${reservationId}`, { reportLink: testReportLink });
            refetch();
            Swal.fire(
                'Submitted!',
                'Your test report has been submitted.',
                'success'
            )
            document.getElementById('my_modal_2').close();
        } catch (error) {
            console.log(error)
        }
    
    }

    return (
        <div>
             {/* Modal */}
             <dialog id="my_modal_2" className="modal">
            <div className="modal-box p-0 max-w-screen-sm">
                <div className="p-10">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl">Enter Test Report</span>
                        </label>
                        <input type="text" name='reportLink' 
                        placeholder="Report PDF / Doc Link" 
                        className="input input-bordered " 
                        value={testReportLink}
                        onChange={(e) => setTestReportLink(e.target.value)}/>

                    </div>
                    <div className="flex flex-row justify-end gap-x-4 my-4">
                        {/* submit button */}
                        <button 
                        className="btn btn-primary text-white"
                        onClick={() => handleSubmit({ reservationId: selectedReservationId, testReportLink })}
                        >Submit</button>
                        {/* cancel button */}
                        <button className="btn" 
                        onClick={() => document.getElementById('my_modal_2').close()}
                        >Cancel</button>
                    </div>
                </div>

            </div>
            </dialog>


            <h2 className="text-3xl mb-4 text-center">Reservations</h2>

            {/* Search Bar */}
            <div className="mb-4 text-center">
                <input
                    type="text"
                    placeholder="Search by Email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="border rounded-md p-2 mr-2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white rounded-md px-4 py-2"
                >
                    Search
                </button>
            </div>

            {/* Reservation Table */}
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="py-2">#</th>
                            <th className="py-2">Reservation ID</th>
                            <th className="py-2">Test Name</th>
                            <th className="py-2">User Email</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status === 'loading' && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {status === 'error' && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Error fetching data
                                </td>
                            </tr>
                        )}
                        {status === 'success' &&
                            reservations.map((reservation, index) => (
                                <tr key={reservation._id}>
                                    <td>{index + 1}</td>
                                    <td>{reservation._id}</td>
                                    <td>{reservation.testName}</td>
                                    <td>{reservation.email}</td>
                                    <td>{reservation.status}</td>
                                    <td className='flex flex-row'>
                                        <button
                                            onClick={() => handleCancelReservation(reservation._id)}
                                            className="bg-red-500 text-white rounded-md px-3 py-1 mr-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleSubmitResult(reservation._id)}
                                            className="bg-green-500 text-white rounded-md px-3 py-1"
                                        >
                                            Submit Result
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            
        </div>
    );
};

export default Reservations;
