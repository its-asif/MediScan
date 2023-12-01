
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    const {user} = useAuth();


    return (
        <div className="flex">
            {/* left side bar */}
            <div className="flex h-screen flex-col justify-between border-e bg-base-200">
                <div className="px-4 py-6 ">
                    {/* top logo */}
                    <span
                    className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 font-bold text-gray-600"
                    >
                    MediScan
                    </span>

                    <ul className="menu w-56 rounded-box ">
                        <li>
                            <h2 className="menu-title">Dashboard</h2>
                            <ul>        
                            {
                                isAdmin ?
                                <>
                                    <li><Link to={'/dashboard/profile'}>My Profile</Link></li>
                                    <li><Link to={'/dashboard/userList'} >All Users</Link></li>
                                    <li><Link to={'/dashboard/addTest'}>Add Test</Link></li>
                                    <li><Link to={'/dashboard/allTest'}>All Tests</Link></li>
                                    <li><Link to={'/dashboard/addBanner'}>Add Banner</Link></li>
                                    <li><Link to={'/dashboard/bannerList'}>All Banners</Link></li>
                                    <li><Link to={'/dashboard/reservations'}>Reservations</Link></li>
                                </>
                                :
                                <>
                                    <li><Link to={'/dashboard/profile'}>My Profile</Link></li>
                                    <li><Link to={'/dashboard/upcomingAppointments'}>Upcoming Appointments</Link></li>
                                    <li><Link to={'/dashboard/testResult'}>Test Result</Link></li>
                                </>
                            }
                            </ul>
                        </li>
                    </ul>


                    <div className="divider"></div>

                    <ul className="menu  w-56 rounded-box">
                        <li>
                            <h2 className="menu-title">Pages</h2>
                            <ul>
                                <li><Link to={'/'}>Home</Link></li>
                                <li><Link to={'/allTestPage'}>All Tests</Link></li>
                                <li><Link to="/blogs">Blogs</Link></li>
                                <li><Link to="/faq">FAQ</Link></li>
                                <li><Link to="/feedback">Feedback</Link></li>
                            </ul>
                        </li>
                    </ul>
                    
                </div>

                 {/* user info */}
                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 ">
                    <div className="flex items-center gap-2 bg-base-200 p-4">
                    <img
                        alt="Man"
                        src={user.photoURL || "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"}
                        className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                        <p className="text-xs">
                        <strong className="block font-medium">{user.displayName}</strong>

                        <span> {user.email} </span>
                        </p>
                    </div>
                    </div>
                </div> 

                </div>

                
            {/* dashboard content */}
            <div className="flex-1 p-10">
                    <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;