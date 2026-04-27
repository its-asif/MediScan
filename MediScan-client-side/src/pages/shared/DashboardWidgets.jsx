import React from 'react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, delta, icon, to }) => (
  <div className="card bg-base-100 shadow-md">
    <div className="card-body">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {delta && <p className="text-xs text-success">{delta}</p>}
        </div>
        <div className="text-3xl text-primary">{icon}</div>
      </div>
      {to && (
        <div className="card-actions justify-end">
          <Link to={to} className="btn btn-link btn-sm">View</Link>
        </div>
      )}
    </div>
  </div>
);

const QuickAction = ({ label, to }) => (
  <Link to={to} className="btn btn-sm btn-outline w-full">
    {label}
  </Link>
);

export const AdminWidgets = () => {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted">Overview of system activity</p>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="1,234" delta="+3.2% this week" icon="👥" to="/dashboard/userList" />
        <StatCard title="Available Tests" value="86" delta="+1 this week" icon="🧪" to="/dashboard/allTest" />
        <StatCard title="Reservations" value="42" delta="-2 this week" icon="📅" to="/dashboard/reservations" />
        <StatCard title="Revenue" value="$12,400" delta="+8% this month" icon="💳" />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title">Recent Activity</h3>
              <ul className="menu">
                <li className="py-2">User <strong>ali@example.com</strong> signed up</li>
                <li className="py-2">Reservation booked for <strong>Blood Test</strong></li>
                <li className="py-2">Payment received: <strong>$45</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <aside>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title">Quick Actions</h3>
              <div className="grid gap-2">
                <QuickAction label="Add Test" to="/dashboard/addTest" />
                <QuickAction label="Add Banner" to="/dashboard/addBanner" />
                <QuickAction label="View Reservations" to="/dashboard/reservations" />
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export const UserWidgets = ({ user }) => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Welcome{user?.displayName ? `, ${user.displayName}` : ''}</h1>
        <p className="text-sm text-muted">Your recent activity and quick links</p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Upcoming Appointments" value="2" icon="📅" to="/dashboard/upcomingAppointments" />
        <StatCard title="Tests Taken" value="5" icon="🧾" to="/dashboard/testResult" />
        <StatCard title="Profile Complete" value="78%" icon="🧑‍⚕️" to="/dashboard/profile" />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title">Recent Tests</h3>
              <ul className="menu">
                <li className="py-2">Hemoglobin — <span className="text-sm text-muted">Normal</span></li>
                <li className="py-2">Cholesterol — <span className="text-sm text-muted">Borderline</span></li>
              </ul>
            </div>
          </div>
        </div>

        <aside>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title">Quick Links</h3>
              <div className="grid gap-2">
                <QuickAction label="Book Appointment" to="/" />
                <QuickAction label="View Test Results" to="/dashboard/testResult" />
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default StatCard;
