import { ExternalUser } from "../models/ExternalUser";



export interface IPricing {
    monthlyPrice: number;
    annualPrice: number;
}

export interface IFeatures {
    maxAdmins: number;
    maxCreators: number;
    maxViewers: number;
}

export interface ISubscriptionPlan {
    planId: string;
    planName: string;
    pricing: {
      monthlyPrice: number;
      annualPrice: number;
    };
    features: {
      maxAdmins: number;
      maxCreators: number;
      maxViewers: number;
    };
    numberOfCredits: number;
    durationInMonths: number;
    isPlanActive: boolean;
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    externalUser: ExternalUser;
  }