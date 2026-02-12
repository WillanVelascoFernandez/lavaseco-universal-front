import React from 'react';
import { ReportesView } from './ReportesView';
import { useReportesController } from './ReportesController';

const Reportes: React.FC = () => {
    const controller = useReportesController();
    return <ReportesView {...controller} />;
};

export default Reportes;
