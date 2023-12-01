import { useLoaderData, useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useEffect, useState } from 'react';
import { FaCalendar, FaDollarSign } from "react-icons/fa";
import CheckoutForm from './payment/CheckoutForm';
import Swal from 'sweetalert2';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import useTestsById from '../../hooks/useTestsById';

const TestDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay_PK);

    const [test, refetch] = useTestsById(id);
    // const {data : test = [], refetch} = useQuery({
    //     queryKey: ['tests', id],
    //     queryFn: async () => {
    //         const { data } = await axiosPublic.get(`/tests/${id}`);
    //         return data;
    //     }
    // });


    // useEffect(() => {
    //     axiosPublic.get(`/tests/${id}`)
    //     .then(result => {   
    //         console.log(result.data);
    //         setTest(result.data);
    //     })
    //     .catch(error => console.log(error))
    // },[])

    const handleBookNow = (test) => {
        console.log(test);
        document.getElementById('my_modal_2').showModal();
    }

    return (
        <div>
            <div className='flex justify-center my-10'>
            <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                <img
                    alt="Home"
                    src={test.image}
                    className="h-96 w-fit rounded-md object-cover"
                />

                <div className="mt-2 mx-10">
                    <dl className=''>
                    <div>
                        <dt className="sr-only"></dt>

                        <dd className="text-base text-gray-500">{test.details}</dd>
                    </div>

                    <div >
                        <dt className="sr-only">Name</dt>

                        <dd className="text-lg font-medium">{test.name}</dd>
                    </div>
                    </dl>

                    <div className="mt-6 flex items-center justify-between">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">

                        <FaDollarSign className='h-4 w-4 text-indigo-500' />

                        <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Price</p>

                        <p className="font-medium">${test.price}</p>
                        </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <svg
                        className="h-4 w-4 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                        </svg>

                        <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Slot</p>

                        <p className="font-medium">{test.slots}</p>
                        </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <FaCalendar className='h-4 w-4 text-indigo-500' />

                        <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Date</p>

                        <p className="font-medium">{test.date}</p>
                        </div>
                    </div>
                    </div>
                </div>

                { test?.slots > 0 ?
                    <button
                    onClick={() => handleBookNow(test)}
                    className="block w-1/3 mx-auto mt-8 rounded bg-yellow-400 p-4 text-lg font-medium transition hover:scale-105"
                    >
                        Book Now
                    </button>
                    :
                    <button
                        disabled
                    className="block w-1/3 mx-auto mt-8 rounded bg-yellow-700 p-4 text-lg font-medium "
                    >   Book Now
                    </button>
                }
                </div>
            </div>
            {/* Modal */}
            <dialog id="my_modal_2" className="modal w-2/3 mx-auto">
                <div className="modal-box w-full p-10">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm test={test} refetch={refetch}/>
                    </Elements>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default TestDetails;