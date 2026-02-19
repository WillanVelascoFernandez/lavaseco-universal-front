import React from 'react';
import { DryersView } from './DryersView';
import { useDryersController } from './DryersController';

const Dryers: React.FC = () => {
    const controller = useDryersController();
    return <DryersView {...controller} />;
};

export default Dryers;
