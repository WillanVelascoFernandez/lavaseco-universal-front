import React from 'react';
import { BranchesView } from './BranchesView';
import { useBranchesController } from './BranchesController';

const Branches: React.FC = () => {
    const controller = useBranchesController();
    return <BranchesView {...controller} />;
};

export default Branches;
