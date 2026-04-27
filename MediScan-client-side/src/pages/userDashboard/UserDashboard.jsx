import React from 'react';
import useAuth from '../../hooks/useAuth';
import { UserWidgets } from '../../pages/shared/DashboardWidgets';

const UserDashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <UserWidgets user={user} />
        </div>
    );
};

export default UserDashboard;