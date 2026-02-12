export interface CycleData {
    time: string;
    temp: string;
    type: string;
}

export type MachineStatus = 'en_espera' | 'en_uso' | 'deshabilitado';

export interface BaseMachine {
    id: string;
    branchId: string;
    status: MachineStatus;
    enabled: boolean;
    usageCount: number;
    revenue: number;
    lastCycle: CycleData;
}
