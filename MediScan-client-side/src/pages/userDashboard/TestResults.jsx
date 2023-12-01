import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { getAuth } from 'firebase/auth';
import useAuth from '../../hooks/useAuth';

const TestResults = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const email = user?.email;
    const [selectedReservationId, setSelectedReservationId] = useState('');
    const [testReportLink, setTestReportLink] = useState('');

    const { data: Tests = [], refetch, status } = useQuery({
        queryKey: 'delivered',
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/delivered/${email}`);
            return res.data;
        },
    });

    console.log(Tests);


    // const handleSubmit= async ({ reservationId, testReportLink }) => {
    //     console.log(testReportLink);
    //     console.log(reservationId);


    //     try {
    //         await axiosSecure.patch(`/payments/${reservationId}`, { reportLink: testReportLink });
    //         refetch();
    //         Swal.fire(
    //             'Submitted!',
    //             'Your test report has been submitted.',
    //             'success'
    //         )
    //         document.getElementById('my_modal_2').close();
    //     } catch (error) {
    //         console.log(error)
    //     }
    
    // }

    const openmodal = (id) => {
        const reservation = Tests.find(test => test._id === id);
        console.log(reservation);
        const { reportLink } = reservation;
        setTestReportLink(reportLink);
        
        setSelectedReservationId(id);
        document.getElementById('my_modal_2').showModal();
    }
   
    return (
        <div>
             {/* Modal */}
             <dialog id="my_modal_2" className="modal">
            <div className="modal-box p-0 max-w-screen-lg h-screen">
                <div className="p-10">
                    <iframe src={testReportLink} className='w-full h-screen'></iframe>

                    <div className="flex flex-row justify-end mt-5 gap-4">
                        <button 
                        className="bg-green-500 text-white rounded-md px-3 py-1"
                        onClick={() => window.print()}
                        >Download</button>
                        <button
                            className="bg-red-500 text-white rounded-md px-3 py-1"
                            onClick={() => document.getElementById('my_modal_2').close()}
                        >
                            Close
                        </button>
                    </div>
                    <div>
                    <div className='text-xs ml-auto w-fit mt-5'>*Press ESC to close modal</div>
                    </div>
                </div>

            </div>
            </dialog>


            <h2 className="text-3xl mb-4 text-center">Test Results</h2>


            {/* Reservation Table */}
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="py-2">#</th>
                            <th className="py-2">Reservation ID</th>
                            <th className="py-2">Transaction ID</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{
                            Tests.map((test, index) => (
                                <tr key={test._id}>
                                    <td>{index + 1}</td>
                                    <td>{test._id}</td>
                                    <td>{test.transactionId}</td>
                                    <td className='flex flex-row'>
                                        <button
                                            onClick={() => openmodal(test._id)}
                                            className="bg-green-500 text-white rounded-md px-3 py-1"
                                        >
                                            View
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

export default TestResults;
