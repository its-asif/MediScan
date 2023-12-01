import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { set, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const axiosPublic = useAxiosPublic(); 
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate(null);
    const [districts, setDistricts] = useState([]);
    const [districtId, setDistrictId] = useState(0);
    const [upazilas, setUpazilas] = useState([]);
    const [confirmPass, setConfirmPass] = useState("");

    useEffect(() => {
        fetch('districts.json')
        .then(res => res.json())
        .then(data => {
            console.log(data[2].data);
            setDistricts(data[2].data);
        })
    },[])

    useEffect(() => {
        console.log(districtId)
        fetch('upazilas.json')
        .then(res => res.json())
        .then(data => {
            const upazila = data[2].data.filter(upazila => upazila.district_id === districtId);
            console.log(upazila);
            setUpazilas(upazila);
        })
    },[districtId])

    const onSubmit = async (data) => {

        // image upload to imgbb and then get an url
        const imageFile = {image : data.photoURL[0]};
        const res = await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        
        data.photoURL = res.data.data.url;
            
            createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateUserProfile(data.name, data.photoURL)
                .then(result => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                        photoURL: data.photoURL,
                        bloodGroup: data.bloodGroup,
                        district: data.district,
                        upazila: data.upazila,
                        uid: user.uid,
                        isAdmin: false,
                        active : true,
                    }
                    console.log("done ",result);
                    axiosPublic.post('/users', userInfo)
                    .then( result => { 
                        if(result.data.insertedId){
                            console.log("user added to the database")
                            reset();
                            Swal.fire({
                                title: "Good job!",
                                text: "Successfully Registered!",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            

                            navigate('/');
                            window.location.reload();

                        }
                    })
                })
                .catch(error => {
                    console.log(error);
                })
            })

    };

    const handleConfirmPass = (e) => {
        setConfirmPass(e.target.value);
        console.log(e.target.value, watch('password'));
        if(e.target.value !== watch('password')){
            console.log("Passwords Don't Match");
        }else{
            console.log("matched");
        }
    }


    return (
        <div className="hero min-h-screen bg-base-200">
        <Helmet>
            <title>fooDie | Register</title>
        </Helmet>
        <div className="hero-content flex-col md:flex-col">
           
            <h1 className="text-5xl font-bold my-4">Register now!</h1>

            <div className="card md:w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="name" {...register("name", { required: true })} name="name" className="input input-bordered" />
                {errors.name && <span className="text-red-600 text-sm">* This field is required</span>}
                </div>

                {/* Photo */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Photo URL</span>
                </label>
                <input type="file" {...register("photoURL", { required: true })} name="photoURL" className="file-input w-full max-w-xs" />
                {errors.photoURL && <span className="text-red-600 text-sm">* This field is required</span>}
                </div>

                {/* Blood Group */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Blood Group</span>
                </label>
                <select className="select select-bordered w-full" {...register("bloodGroup", { required: true })} name="bloodGroup">
                    <option disabled="disabled" selected="selected">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                    <option value="O-">O-</option>
                </select>
                {errors.bloodGroup && <span className="text-red-600 text-sm">* This field is required</span>}
                </div>

                {/* District */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">District</span>
                </label>
                <select className="select select-bordered w-full" {...register("district", { required: true })} name="district" onChange={(e) => setDistrictId(e.target.selectedIndex.toString())}>
                    <option disabled="disabled" selected="selected">Select District</option>
                    {
                        districts.map( district => <option id="district.id" value={district.name}
                        >{district.name}</option>)
                    }
                </select>
                {errors.district && <span className="text-red-600 text-sm">* This field is required</span>}
                </div>

                {/* Upazila */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Upazila</span>
                    </label>
                    <select className="select select-bordered w-full" {...register("upazila", { required: true })} name="upazila">
                        <option disabled="disabled" selected="selected">Select Upazila</option>
                        {
                            upazilas.map( upazila => <option value={upazila.name}
                            >{upazila.name}</option>)
                        }
                    </select>
                    {errors.upazila && <span className="text-red-600 text-sm">* This field is required</span>}
                </div>



                {/* Email */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name="email" {...register("email", { required: true })} className="input input-bordered" />
                {errors.email && <span className="text-red-600 text-sm">* This field is required</span>}
                </div>

                {/* Password */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" {...register("password", { 
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{6,20}$/  ,
                    })} placeholder="password" className="input input-bordered" />
                {errors.password?.type === 'required' && <span className="text-red-600 text-sm">* This field is required</span>}
                {errors.password?.type === 'minLength' && <span className="text-red-600 text-sm">* Password must be atleast 6 characters</span>}
                {errors.password?.type === 'maxLength' && <span className="text-red-600 text-sm">* Password must be less then 20 characters</span>}
                {errors.password?.type === 'pattern' && <span className="text-red-600 text-sm">* Must include at least one digit, one lowercase, one uppercase, and one special character</span>}

                {/* <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label> */}
                </div>

                {/* Confirm Password */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Confirm Password</span>
                </label>
                <input type="password" name="confirmPassword" placeholder="confirm password" onChange={handleConfirmPass} className="input input-bordered" />

                {/* <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label> */}
                </div>
                
                {
                    confirmPass !== watch('password') ? 
                    <div className="form-control mt-6">
                        <input  className="btn btn-primary" type="submit" value="Register"/>
                        <span className="text-red-600 text-sm">* Passwords Don't Match</span>
                    </div>
                    :
                    <div className="form-control mt-6">
                        <input  className="btn btn-primary" type="submit" value="Register" />
                    </div>
                }
            </form>
            <p className="text-center"><small>Already have an account? <Link to='/login' className="text-blue-700">Login Please</Link></small></p>
               
            </div>
        </div>
        </div>
    );
};

export default Register;