import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddBanner = () => {

    const {register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        data.isActive = false;
        console.log(data);

        const res = await axiosSecure.post('/banners', data)
        console.log(res.data);

        if(res.data.insertedId){
            Swal.fire({
                position : "center",
                icon : "success",
                title: `${data.title} Added`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex gap-x-4">
                    {/* Banner Title */}
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Banner Title*</span>
                        </label>
                        <input type="text" placeholder="Banner Title" 
                        {...register("title", { required: true })}
                        className="input input-bordered w-full" />
                    </div>

                    {/* Banner Text */}
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Banner Text*</span>
                        </label>
                        <input type="text" placeholder="Discount Details" 
                        {...register("text", { required: true })}
                        className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="flex gap-x-4">
                    {/* coupon code */}
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Coupon Code*</span>
                        </label>
                        <input type="text" placeholder="ex: WELLNESS15" 
                        {...register("coupon_code", { required: true })}
                        className="input input-bordered w-full" />
                    </div>
            
                    {/* discount rate */}   
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Discount Rate*</span>
                        </label>
                        <input type="text" placeholder="ex: 15" 
                        {...register("discount_rate", { required: true })}
                        className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="form-control w-full my-4">
                    <label className="label">
                        <span className="label-text">Banner Image URL*</span>
                    </label>
                    <input type="text" placeholder="ex: https://i.imgur.com/1jDwZqD.png" 
                    {...register("image", { required: true })}
                    className="input input-bordered w-full" />
                </div>

                <div className="flex justify-end">
                    <button className="btn btn-warning ">Add Banner</button>
                </div>
            </form>
        </div>
    );
};

export default AddBanner;