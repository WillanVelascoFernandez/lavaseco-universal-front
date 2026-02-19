import React from 'react';
import { UsersView } from './UsersView';
import { useUsersController } from './UsersController';

const Users: React.FC = () => {
    const controller = useUsersController();
    return <UsersView {...controller} />;
};

export default Users;
