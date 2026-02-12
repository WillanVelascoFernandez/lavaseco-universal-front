import React from 'react';
import { SucursalesView } from './SucursalesView';
import { useSucursalesController } from './SucursalesController';

const Sucursales: React.FC = () => {
    const controller = useSucursalesController();
    return <SucursalesView {...controller} />;
};

export default Sucursales;
