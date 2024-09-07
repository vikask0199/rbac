import { IExternalPermission } from "./PermissionInterface";




export interface IExternalRole {
    id: number;
    roleName: string;
    permissions: IExternalPermission[]; 
  }