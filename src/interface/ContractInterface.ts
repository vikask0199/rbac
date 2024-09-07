import { IExternalUser } from "./ExternalUserInterface";
import { IMember } from "./MemberInterface";
import { ISubscription } from "./SubscriptionInterface";



export interface IContract {
  conId: string;
  contractId: string;
  user: IExternalUser;
  subscriptions: ISubscription[];
  members: IMember[];
}