
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaFileMedical } from "react-icons/fa";


const AddTest = () => {

    const {register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);

        const res = await axiosSecure.post('/tests', data);
        console.log(res.data);
        if(res.data.insertedId){
            Swal.fire({
                position : "center",
                icon : "success",
                title: `${data.name} Added`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <div>
           <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Test Name*</span>
                        </label>
                        <input type="text" placeholder="Type here" 
                        {...register("name", { required: true })}
                        className="input input-bordered w-full" />
                    </div>

                    <div className="flex gap-x-4">
                        {/* Slots */}
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text">Slots*</span>
                            </label>
                            <input type="number" placeholder="Slots" 
                            {...register("slots", { required: true })}
                            className="input input-bordered w-full" />
                        </div>
                        {/* Price */}
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="text" placeholder="Price" 
                            {...register("price", { required: true })}
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
                            {...register("image", { required: true })}
                            className="input input-bordered w-full" />
                        </div>
                        {/* Date */}
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text">Date*</span>
                            </label>
                            <input type="date" placeholder="Date" 
                            {...register("date", { required: true })}
                            className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Test Description*</span>
                        </label>
                        <textarea
                        {...register("details", { required: true })}
                        className="textarea textarea-bordered h-24" placeholder="Test Description"></textarea>
                    </div>


                    <button className="btn btn-warning">
                        Add Test <FaFileMedical className=""></FaFileMedical>
                        </button>
                </form>
            </div>
        </div>
    );
};

export default AddTest;