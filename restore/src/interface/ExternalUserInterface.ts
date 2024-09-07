import { ExternalRole } from "../models/ExternalRole";
import { OrgProfile } from "../models/OrgProfile";
import { PlanHistory } from "../models/PlanHistory";
import { SubscriptionPlan } from "../models/SubscriptionPlan";


// export interface IExternalUser {
//     userId?: string;
//     userName: string;
//     userEmail: string;
//     userPassword: string;
//     userConfirmPassword: string;
//     role?: string;
// }

export interface ILoginUser {
    userEmail: string;
    userPassword: string;
}


export interface IContinueWithGoogle {
    token: string;
}


export interface IExternalUser {
    externalUserId: string;
    externalUserName: string;
    externalUserEmail: string;
    externalUserPassword?: string;
    externalUserConfirmPassword?: string;
    externalUserGoogleProfileId?: string;
    isExternalUserVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    orgProfile?: OrgProfile;
    role: ExternalRole;
    subscriptionPlans?: SubscriptionPlan[];
    planHistories?: PlanHistory[];
}


export interface IExternalUserRequest {
    externalUserId?: string;
    externalUserName: string;
    externalUserEmail: string;
    externalUserPassword: string;
    externalUserConfirmPassword: string;
    isIndividual: boolean;
    orgName?: string;
    address?: string;
    contactNumber?: string;
    selectedPlanId: string;
}