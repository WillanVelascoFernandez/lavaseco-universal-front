import React from 'react';
import { RolesView } from './RolesView';
import { useRolesController } from './RolesController';

const Roles: React.FC = () => {
    const controller = useRolesController();
    return <RolesView {...controller} />;
};

export default Roles;

