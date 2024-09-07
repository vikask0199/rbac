import { IOrganizationProfile } from "./OrgInterface";
import { IExternalRole } from "./RoleInterface";



export interface IMember {
    id: number;
    name: string;
    email: string;
    organization: IOrganizationProfile;
    role: IExternalRole;
  }