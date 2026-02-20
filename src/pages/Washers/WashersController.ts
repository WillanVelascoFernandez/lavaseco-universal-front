import { useEffect } from 'react';
import { useWashers } from './WashersContext';

export const useWashersController = () => {
    const { washers, toggleWasherStatus, refreshWashers } = useWashers();

    useEffect(() => {
        refreshWashers();
    }, [refreshWashers]);

    const handleToggle = (id: string) => {
        toggleWasherStatus(id);
    };

    return {
        washers,
        handleToggle
    };
};
