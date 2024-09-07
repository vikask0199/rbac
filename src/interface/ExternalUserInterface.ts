import { IContract } from "./ContractInterface";
import { IOrganizationProfile } from "./OrgInterface";
import { ISubscription } from "./SubscriptionInterface";



export interface IExternalUser {
  extUserId: string;
  email: string;
  password: string;
  name: string;
  accountType: 'individual' | 'organization';
  contract: IContract;
  organizationProfile?: IOrganizationProfile | null;
  createdAt: Date;
}

export interface IExternalUserCreateAccount {
  extUserId?: string;
  email: string;
  password: string;
  name: string;
  accountType: 'individual' | 'organization';
  subscriptionId: string; 
}


