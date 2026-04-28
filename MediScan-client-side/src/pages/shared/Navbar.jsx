import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useActiveStatus from '../../hooks/useActiveStatus';
import Swal from 'sweetalert2';
import useTheme from '../../hooks/useTheme';

const Navbar = () => {
    const {user, logout, loading} = useContext(AuthContext);
    // const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const [isActive] = useActiveStatus();
    const theme = useTheme();
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
        <header className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/85 backdrop-blur-xl">
            <div className="mediscan-shell">
                <div className="navbar px-0 text-base-content">
                    <div className="navbar-start gap-3">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost border border-base-300 bg-base-200 text-base-content lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] w-64 rounded-3xl border border-base-300 bg-base-100 p-3 shadow-2xl">
                                {navOptions}
                            </ul>
                        </div>
                        <Link to="/" className="group inline-flex items-center gap-3 rounded-full border border-base-300 bg-base-200 px-4 py-2">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content font-black shadow-lg shadow-primary/20">M</span>
                            <span className="text-left leading-tight">
                                <span className="block text-sm font-semibold uppercase tracking-[0.24em] text-primary">MediScan</span>
                                <span className="block text-xs text-base-content/70">Diagnostic care</span>
                            </span>
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal items-center gap-1 px-1 text-sm font-medium text-base-content">
                            {navOptions}
                        </ul>
                    </div>

                    <div className="navbar-end gap-3">
                        <button onClick={theme?.toggleTheme} className="btn border border-base-300 bg-base-200 text-base-content hover:bg-base-300">
                            {theme?.isDark ? 'Light mode' : 'Dark mode'}
                        </button>
                        {user ? (
                            <button onClick={handleLogout} className="btn border-0 bg-primary text-primary-content shadow-lg shadow-primary/20 hover:bg-primary-focus">
                                Log out
                            </button>
                        ) : (
                            <Link to="/login" className="btn border border-base-300 bg-base-200 text-base-content hover:bg-base-300">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;