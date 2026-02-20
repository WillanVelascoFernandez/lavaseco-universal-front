export interface User {
    id: number;
    name: string;
    role: any;
    email: string;
    lastActive: string;
    lastActiveRaw: string | null;
    status: 'active' | 'inactive';
    branches: any[];
    isProtected?: boolean;
}
