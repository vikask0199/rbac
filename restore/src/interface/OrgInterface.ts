
export interface IOrganizationDetails {
    orgName: string;
    address: string;
    contactNumber: string;
    superAdminId?: string;
    members?: string[];
    subscriptionPlanIds?: string[];
}