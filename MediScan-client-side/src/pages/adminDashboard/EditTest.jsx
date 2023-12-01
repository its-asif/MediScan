import { useLoaderData, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaFileMedical } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const EditTest = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const {register, handleSubmit } = useForm();

    const test = useLoaderData();


    const onSubmit = async (data) => {
        const testDetails = {
            name : data.name,
            slots : parseInt(data.slots),
            price : parseInt(data.price),
            image : data.image,
            date : data.date,
            details : data.details
        }
        console.log(testDetails)
        const testRes = await axiosSecure.patch(`/tests/${id}`, testDetails);
        console.log(testRes.data);
        if(testRes.data.modifiedCount > 0){
            Swal.fire({
                position : "center",
                icon : "success",
                title: `${data.name} Updated`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    
    return (
        <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Test Name*</span>
                        </label>
                        <input type="text" placeholder="Type here" 
                        {...register("name")}
                        defaultValue={test?.name}
                        className="input input-bordered w-full" />
                    </div>

                    <div className="flex gap-x-4">
                        {/* Slots */}
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text">Slots*</span>
                            </label>
                            <input type="number" placeholder="Slots" 
                            {...register("slots")}
                            defaultValue={test?.slots}
                            className="input input-bordered w-full" />
                        </div>
                        {/* Price */}
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="text" placeholder="Price" 
                            {...register("price")}
                            defaultValue={test?.price}
                            className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="flex gap-x-4">
                        {/* Photo URL */}
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text">Cover Photo URL*</span>
                            </label>
                            <input type="text" placeholder="Cover Photo URL" 
                            {...register("image")}
                            defaultValue={test?.image}
                            className="input input-bordered w-full" />
                        </div>
                        {/* Date */}
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text">Date*</span>
                            </label>
                            <input type="date" placeholder="Date" 
                            {...register("date")}
                            defaultValue={test?.date}
                            className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Test Description*</span>
                        </label>
                        <textarea
                        {...register("details")}
                        defaultValue={test?.details}
                        className="textarea textarea-bordered h-24" placeholder="Test Description"></textarea>
                    </div>


                    <button className="btn btn-warning">
                        Update Test <FaFileMedical></FaFileMedical>
                        </button>
                </form>
            </div>
    );
};

export default EditTest;