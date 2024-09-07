import { ExternalPermission } from "../models/ExternalPermission";
import { IExternalPermission } from "./ExternalPermission";


export interface IExternalRole {
    externalRoleName: string;
    permissionIds?: string[]; 
}


export interface IExternalRole {
    externalRoleId: string; 
    roleName: string;           
    permissions: IExternalPermission[];
}
