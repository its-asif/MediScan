import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Reservations = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reservations = [], refetch, isPending, isError } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        },
    });

    const [searchEmail, setSearchEmail] = useState('');
    const [testReportLink, setTestReportLink] = useState('');
    const [selectedReservationId, setSelectedReservationId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredReservations = useMemo(() => reservations.filter((reservation) =>
        reservation.email.toLowerCase().includes(searchEmail.toLowerCase())
    ), [reservations, searchEmail]);

    const handleCancelReservation = async (reservationId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning', 
            showCancelButton: true,
            confirmButtonColor: '#3085d6', 
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await axiosSecure.delete(`/payments/${reservationId}`);
            await refetch();
            Swal.fire('Cancelled!', 'Your appointment has been cancelled.', 'success');
        } catch (error) {
            console.log(error)
        }
    };

    const handleSubmitResult = async (reservationId) => {
        setSelectedReservationId(reservationId);
        setTestReportLink('');
        setIsModalOpen(true);
    };

    const handleSubmit= async ({ reservationId, testReportLink }) => {
        try {
            await axiosSecure.patch(`/payments/${reservationId}`, { reportLink: testReportLink });
            await refetch();
            setIsModalOpen(false);
            Swal.fire('Submitted!', 'Your test report has been submitted.', 'success');
        } catch (error) {
            console.log(error)
        }
    
    }

    return (
        <div>
             {/* Modal */}
             <dialog className="modal" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
                        onClick={() => setIsModalOpen(false)}
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
                    onClick={() => setSearchEmail(searchEmail.trim())}
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
                        {isPending && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {isError && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Error fetching data
                                </td>
                            </tr>
                        )}
                        {!isPending && !isError &&
                            filteredReservations.map((reservation, index) => (
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
