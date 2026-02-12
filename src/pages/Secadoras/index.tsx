import React from 'react';
import { SecadorasView } from './SecadorasView';
import { useSecadorasController } from './SecadorasController';

const Secadoras: React.FC = () => {
    const controller = useSecadorasController();
    return <SecadorasView {...controller} />;
};

export default Secadoras;
