import React from 'react';
import { WashersView } from './WashersView';
import { useWashersController } from './WashersController';

const Washers: React.FC = () => {
    const controller = useWashersController();
    return <WashersView {...controller} />;
};

export default Washers;
