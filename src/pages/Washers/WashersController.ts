import { useWashers } from './WashersContext';

export const useWashersController = () => {
    const { washers, toggleWasherStatus } = useWashers();

    const handleToggle = (id: string) => {
        toggleWasherStatus(id);
    };

    return {
        washers,
        handleToggle
    };
};
