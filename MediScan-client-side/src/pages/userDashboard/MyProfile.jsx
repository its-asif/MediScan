import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import StatCard from '../shared/DashboardWidgets';

const MyProfile = () => {

    const {user, loading} = useAuth();
    const {displayName, email, photoURL} = user || {};
    const [userData, setUserData] = useState({});
    const [userDataLoading, setUserDataLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
      if (!email) return;
      setUserDataLoading(true);
      axiosSecure.get(`/users/${email}`)
        .then(res => {
          setUserData(res.data[0] || {});
        }).catch(() => setUserData({}))
        .finally(() => setUserDataLoading(false));
    }, [axiosSecure, email]);

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    const avatar = photoURL || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&q=80&auto=format&fit=crop&crop=faces';

    return (
        <div>
            <Helmet>
                <title> MediScan | My Profile </title>
            </Helmet>

            <div className="max-w-4xl mx-auto mt-10 px-4">
              <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden">
                <div className="card-body p-6 lg:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Left: Avatar & basic info */}
                    <div className="flex flex-col items-center text-center">
                      {userDataLoading ? (
                        <div className="animate-pulse">
                          <div className="h-28 w-28 rounded-full bg-base-200" />
                          <div className="mt-4 h-5 w-40 rounded bg-base-200 mx-auto" />
                          <div className="mt-2 h-4 w-28 rounded bg-base-200 mx-auto" />
                        </div>
                      ) : (
                        <>
                          <img src={avatar} alt="avatar" className="h-28 w-28 rounded-full object-cover ring-4 ring-base-100 shadow-md" />
                          <h2 className="mt-4 text-xl font-semibold">{displayName || 'Unnamed User'}</h2>
                          <p className="text-sm text-muted">{userData?.isAdmin ? 'Administrator' : 'General User'}</p>
                          <p className="mt-2 text-sm badge badge-primary">{email}</p>

                          <div className="mt-4 w-full">
                            <Link to="/dashboard/editProfile" className="btn btn-sm btn-outline w-full">Edit Profile</Link>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Middle: Details */}
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="p-4">
                          <h3 className="text-sm text-muted">Personal Details</h3>
                          {userDataLoading ? (
                            <div className="mt-2 space-y-2 animate-pulse">
                              <div className="h-4 w-3/4 bg-base-200 rounded" />
                              <div className="h-4 w-1/2 bg-base-200 rounded" />
                              <div className="h-4 w-2/3 bg-base-200 rounded" />
                              <div className="h-4 w-1/3 bg-base-200 rounded" />
                            </div>
                          ) : (
                            <div className="mt-2 text-base space-y-1">
                              <p><strong>Blood Group:</strong> {userData?.bloodGroup || '—'}</p>
                              <p><strong>Phone:</strong> {userData?.phone || '—'}</p>
                              <p><strong>District:</strong> {userData?.district || '—'}</p>
                              <p><strong>Upazila:</strong> {userData?.upazila || '—'}</p>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="text-sm text-muted">Account</h3>
                          {userDataLoading ? (
                            <div className="mt-2 space-y-2 animate-pulse">
                              <div className="h-4 w-1/2 bg-base-200 rounded" />
                              <div className="h-4 w-2/3 bg-base-200 rounded" />
                              <div className="h-4 w-1/3 bg-base-200 rounded" />
                            </div>
                          ) : (
                            <div className="mt-2 text-base space-y-1">
                              <p><strong>Joined:</strong> {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : '—'}</p>
                              <p><strong>Role:</strong> {userData?.isAdmin ? 'Admin' : 'User'}</p>
                              <p><strong>Verified:</strong> {userData?.isVerified ? 'Yes' : 'No'}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 items-stretch">
                        <StatCard title="Upcoming" value={userData?.upcomingAppointments || '0'} icon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        } />
                        <StatCard title="Tests" value={userData?.testsTaken || '0'} icon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M7 21h10"/></svg>
                        } />
                        <div className="flex items-center">
                          <div className="w-full">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm text-muted">Profile Complete</p>
                              <p className="text-sm font-semibold">{`${userData?.profileComplete || 0}%`}</p>
                            </div>
                            <div className="w-full bg-base-200 rounded-full h-3">
                              <div className="bg-primary h-3 rounded-full" style={{width: `${userData?.profileComplete || 0}%`}} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>
    );
};

export default MyProfile;