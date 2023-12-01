import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useActiveStatus from '../../hooks/useActiveStatus';
import Swal from 'sweetalert2';

const Navbar = () => {
    const {user, logout, loading} = useContext(AuthContext);
    // const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const [isActive] = useActiveStatus();
    // console.log("is active ? ",isActive);

    const handleLogout = () => {
        logout()
            .then( () => {})
            .catch( error => console.log(error))
    }

    const showStatusMessage = () => {
        Swal.fire({
            title: "Sorry!",
            text: "Your account is Disabled!",
            icon: "error"
          });
    }

    // const [isdark, setIsdark] = useState(
    //     JSON.parse(localStorage.getItem('isdark'))
    //   );
    //   useEffect(() => {
    //     localStorage.setItem('isdark', JSON.stringify(isdark));
    //   }, [isdark]);

    const navOptions = <>
        <li><Link className='hover:bg-warning hover:text-black' to="/">Home</Link></li>
        <li><Link className='hover:bg-warning hover:text-black' to="/allTestPage">All Tests</Link></li>
        <li><Link className='hover:bg-warning hover:text-black' to="/symptomChecker">Symptom Checker</Link></li>
        <li><Link className='hover:bg-warning hover:text-black' to="/blogs">Blogs</Link></li>
        <li><Link className='hover:bg-warning hover:text-black' to="/faq">FAQ</Link></li>
        <li><Link className='hover:bg-warning hover:text-black' to="/feedback">Feedback</Link></li>
        { !user &&  <li><Link className='hover:bg-warning hover:text-black' to="/register">Register</Link></li>}
        { isAdmin && <li><Link className='hover:bg-warning hover:text-black' to="/dashboard/profile">Dashboard</Link></li>}
        { !isAdmin && isActive && <li><Link className='hover:bg-warning hover:text-black' to="/dashboard/profile">Dashboard</Link></li>}
        { user && !isAdmin && !isActive && <li 
            onClick={() => showStatusMessage()}
        ><Link className='hover:bg-warning hover:text-black' to="">Dashboard</Link></li>}
        
        
    </>


    if(loading || isActive === null){
        return <progress className="progress w-56"></progress>
    }

    return (
        <div>
            <div className="navbar fixed top-0 z-10 bg-black text-warning max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 hover:text-white rounded-box w-52">
                        {navOptions}
                    </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl lg:text-4xl lg:font-bold lg:ml-10  ">MediScan</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                {/* <label className="flex cursor-pointer gap-2">
                    <input
            type="checkbox"
            checked={isdark}
            onChange={() => setIsdark(!isdark)}
          />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                    <input type="checkbox" checked={isdark} onChange={() => setIsdark(!isdark)} value="synthwave" className="toggle theme-controller"/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label> */}
                
                {
                    user ? <>
                    <button onClick={handleLogout} className='btn btn-warning'>Log out</button>
                    </> : <>
                        <li className='btn '><Link to='/login'>Login</Link></li>
                    </>
                }
                </div>
            </div>
        </div>
    );
};

export default Navbar;