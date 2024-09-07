import { IExternalRole } from "./RoleInterface";



export interface IExternalPermission {
    id: number;
    permissionName: string;
    roles: IExternalRole[];
  }