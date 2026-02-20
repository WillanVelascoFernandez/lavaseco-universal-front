export interface Branch {
    id: number;
    name: string;
    address: string;
    phone?: string;
    _count?: {
        washers: number;
        dryers: number;
        users: number;
    };
    // Legacy fields for UI compatibility
    revenue?: number;
    userCount?: number;
    washerPrice?: number;
    dryerPrice?: number;
    washerCount?: number;
    dryerCount?: number;
    washerTime?: number;
    dryerTime?: number;
    totalWashes?: number;
    totalDries?: number;
}
