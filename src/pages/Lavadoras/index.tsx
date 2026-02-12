import React from 'react';
import { LavadorasView } from './LavadorasView';
import { useLavadorasController } from './LavadorasController';

const Lavadoras: React.FC = () => {
    const controller = useLavadorasController();
    return <LavadorasView {...controller} />;
};

export default Lavadoras;
