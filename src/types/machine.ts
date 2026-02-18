export interface CycleData {
    time: string;
    temp: string;
    type: string;
}

export interface HistoryEntry {
    id: string;
    date: string;
    time: string;
    cycleType: string;
    duration: string;
    revenue: number;
    user: string;
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
    history: HistoryEntry[];
}
