import { IExternalUser } from "./ExternalUserInterface";
import { ISubscriptionPlan } from "./SubscriptionPlanInterface";



export interface IPlanHistory {
    historyId: string;
    externalUser: IExternalUser;
    subscriptionPlan: ISubscriptionPlan;
    startDate: Date;
    endDate?: Date;
}
