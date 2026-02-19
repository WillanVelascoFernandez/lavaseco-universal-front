import { useDryers } from './DryersContext';

export const useDryersController = () => {
    const { dryers, toggleDryerStatus } = useDryers();

    const handleToggle = (id: string) => {
        toggleDryerStatus(id);
    };

    return {
        dryers,
        handleToggle
    };
};
