export interface User {
    id: number;
    name: string;
    role: any;
    email: string;
    lastActive: string;
    status: 'active' | 'inactive';
    branches: any[];
}
