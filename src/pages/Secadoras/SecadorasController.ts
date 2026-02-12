import { useDryers } from '../../models/DryerContext';

export const useSecadorasController = () => {
    const { dryers, toggleDryerStatus } = useDryers();

    const handleToggle = (id: string) => {
        toggleDryerStatus(id);
    };

    return {
        secadoras: dryers,
        handleToggle
    };
};
