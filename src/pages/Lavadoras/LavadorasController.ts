import { useWashers } from '../../models/WasherContext';

export const useLavadorasController = () => {
    const { washers, toggleWasherStatus } = useWashers();

    const handleToggle = (id: string) => {
        toggleWasherStatus(id);
    };

    return {
        lavadoras: washers,
        handleToggle
    };
};
