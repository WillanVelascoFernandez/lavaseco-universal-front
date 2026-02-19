import React from 'react';
import { ReportsView } from './ReportsView';
import { useReportsController } from './ReportsController';

const Reports: React.FC = () => {
    const controller = useReportsController();
    return <ReportsView {...controller} />;
};

export default Reports;
