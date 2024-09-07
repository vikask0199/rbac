import { IMember } from "./MemberInterface";


export interface IOrganizationProfile {
  orgId?: string;
  organizationName: string;
  address: string;
  owner: string;
  members?: IMember[];
}