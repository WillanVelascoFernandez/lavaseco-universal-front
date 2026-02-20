import { useEffect } from 'react';
import { useDryers } from './DryersContext';

export const useDryersController = () => {
    const { dryers, toggleDryerStatus, refreshDryers } = useDryers();

    useEffect(() => {
        refreshDryers();
    }, [refreshDryers]);

    const handleToggle = (id: string) => {
        toggleDryerStatus(id);
    };

    return {
        dryers,
        handleToggle
    };
};
