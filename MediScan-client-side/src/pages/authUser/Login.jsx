import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard/profile';

    const { signIn} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)
        signIn(email, password)
        .then( result => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                title: "Good job!",
                text: "Successfully Logged in!",
                icon: "success"
              });
            navigate(from, {replace:true});
        })
    }


    return (
        <div className="hero min-h-screen bg-base-200">
        <Helmet>
            <title>fooDie | Login</title>
        </Helmet>
        <div className="hero-content flex-col">
            <div className="text-center md:w-full lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
            </div>
            <div className="card md:w-full shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>

                {/* Email */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                </div>

                {/* Password */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>

                <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Login" />
                </div>
            </form>
            <p className='text-center'><small>New Here? <Link to='/register' className='text-blue-700'>Create an account</Link></small></p>
            
            </div> 
        </div>
        </div>
    );
};

export default Login;