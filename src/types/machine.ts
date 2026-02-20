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

export type MachineStatus = 'idle' | 'in_use' | 'disabled';

export interface BaseMachine {
    id: string;
    name: string;
    branchId: string;
    status: MachineStatus;
    enabled: boolean;
    usageCount: number;
    revenue: number;
    lastCycle: CycleData;
    history: HistoryEntry[];
}

export type Washer = BaseMachine;
export type Dryer = BaseMachine;
