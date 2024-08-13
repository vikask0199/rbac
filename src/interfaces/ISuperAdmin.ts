export interface ISuperAdminRequest {
    name: string;
    primaryEmail: string;
    secondaryEmail: string;
    password?: string;
    isActive?: boolean;
}

export interface ISuperAdminResponse {
    name: string;
    primaryEmail: string;
    secondaryEmail: string;
    isActive: boolean;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISuperAdminBasicResponse {
    name: string;
    primaryEmail: string;
}
