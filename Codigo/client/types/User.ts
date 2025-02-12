import type Address from './Address';

enum UserRole {
    ADMIN = 'admin',
    ACCOUNTANT = 'accountant',
    SECRETARY = 'secretary',
    BASIC = 'basic',
}

export default interface User {
    id: string;
    name: string;
    email: string;
    cpf?: string;
    password?: string;
    role: UserRole;
    bearerToken?: string;
    address?: Address;
    _status?: 'new' | 'modified' | 'deleted' | 'synced';
}